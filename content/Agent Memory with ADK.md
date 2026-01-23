---
title: Agent Memory with ADK
draft: false
date: 2025-11-12
tags:
  - ai/agents
  - ai/5dgai
---
This note contains an example of how to use memory with [[Google Agent Developer Kit]] (ADK) in [[Python]]. It pulls heavily from [this Kaggle notebook](https://www.kaggle.com/code/ekholme/day-3b-agent-memory/edit?fromFork=1)

In this example, we'll use the `InMemoryMemoryService` implementation from ADK, but for production applications using [[Vertex AI]], we can use **Vertex AI Memory Bank**.

## Setup

Load packages, create helper functions, etc.

```python
from google.adk.agents import LlmAgent
from google.adk.models.google_llm import Gemini
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.memory import InMemoryMemoryService
from google.adk.tools import load_memory, preload_memory
from google.genai import types
```

```python
async def run_session(
    runner_instance: Runner, user_queries: list[str] | str, session_id: str = "default"
):
    """Helper function to run queries in a session and display responses."""
    print(f"\n### Session: {session_id}")

    # Create or retrieve session
    try:
        session = await session_service.create_session(
            app_name=APP_NAME, user_id=USER_ID, session_id=session_id
        )
    except:
        session = await session_service.get_session(
            app_name=APP_NAME, user_id=USER_ID, session_id=session_id
        )

    # Convert single query to list
    if isinstance(user_queries, str):
        user_queries = [user_queries]

    # Process each query
    for query in user_queries:
        print(f"\nUser > {query}")
        query_content = types.Content(role="user", parts=[types.Part(text=query)])

        # Stream agent response
        async for event in runner_instance.run_async(
            user_id=USER_ID, session_id=session.id, new_message=query_content
        ):
            if event.is_final_response() and event.content and event.content.parts:
                text = event.content.parts[0].text
                if text and text != "None":
                    print(f"Model: > {text}")


```

```python
retry_config = types.HttpRetryOptions(
    attempts=5,  # Maximum retry attempts
    exp_base=7,  # Delay multiplier
    initial_delay=1,
    http_status_codes=[429, 500, 503, 504],  # Retry on these HTTP errors
)
```

## Memory Workflow

There are 3 high-level steps to integrate Memory into agents:

1. **Initialize** a `MemoryService` and provide it to the `Runner`.
2. **Ingest** -- transfer session data to memory using `add_session_to_memory()`
3. **Retrieve** memories using `search_memory()`

## Initializing a MemoryService

We want to initialize a memory service, add the memory to an agent, then create a `Runner` that has access to a session (see [[Agent Session Management with ADK]]) and Memory.

```python
memory_service = (
    InMemoryMemoryService()
)  # ADK's built-in Memory Service for development and testing
```

```python
APP_NAME = "MemoryDemoApp"
USER_ID = "demo_user"

# Create agent
user_agent = LlmAgent(
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    name="MemoryDemoAgent",
    instruction="Answer user questions in simple words.",
)
```

```python
# Create Session Service
session_service = InMemorySessionService()  # Handles conversations

# Create runner with BOTH services
runner = Runner(
    agent=user_agent,
    app_name="MemoryDemoApp",
    session_service=session_service,
    memory_service=memory_service,  # Memory service is now available!
)
```

One thing to note is that adding the `MemoryService` to our `Runner` makes memory available to our agent, but the agent won't use it automatically. We still need to explicitly ingest data and enable retrieval.

## Ingest Session Data to Memory

We'll have a simple conversation to illustrate how to store session data in memory.

```python
# User tells agent about their favorite color
await run_session(
    runner,
    "My favorite color is blue-green. Can you write a Haiku about it?",
    "conversation-01",  # Session ID
)
```

Before sending this to memory, let's verify that the session captured the interaction:

```python
session = await session_service.get_session(
    app_name=APP_NAME, user_id=USER_ID, session_id="conversation-01"
)

# Let's see what's in the session
print("📝 Session contains:")
for event in session.events:
    text = (
        event.content.parts[0].text[:60]
        if event.content and event.content.parts
        else "(empty)"
    )
    print(f"  {event.content.role}: {text}...")
```

Now we can transfer it to memory using the `add_session_to_memory()` method.

```python
await memory_service.add_session_to_memory(session)
```

## Memory Retrieval

We can retrieve memories either with `load_memory` (a reactive approach) or `preload_memory` (a proactive approach). Studying for an exam is an analogy for these. `load_memory` only looks up things when we need to know them, whereas `preload_memory` reads all of the notes before answering each question.

We can use either as a [[Tools (AI Agents)|tool]] available to the agent:

```python
# Create agent
user_agent = LlmAgent(
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    name="MemoryDemoAgent",
    instruction="Answer user questions in simple words. Use load_memory tool if you need to recall past conversations.",
    tools=[
        load_memory
    ],  # Agent now has access to Memory and can search it whenever it decides to!
)

# Create a new runner with the updated agent
runner = Runner(
    agent=user_agent,
    app_name=APP_NAME,
    session_service=session_service,
    memory_service=memory_service,
)

# # run a demo in 'birthday-session01'
await run_session(runner, "My birthday is on March 15th.", "birthday-session-01")

# Manually save the session to memory
birthday_session = await session_service.get_session(
    app_name=APP_NAME, user_id=USER_ID, session_id="birthday-session-01"
)

await memory_service.add_session_to_memory(birthday_session)

# Test retrieval in a NEW session
await run_session(
    runner, "When is my birthday?", "birthday-session-02"  # Different session ID
)
```

**What happens:**

1. Agent receives: "When is my birthday?"
2. Agent recognizes: This requires past conversation context
3. Agent calls: `load_memory("birthday")`
4. Memory returns: Previous conversation containing "March 15th"
5. Agent responds: "Your birthday is on March 15th"

The memory retrieval worked even though this is a completely different session!

## Manually Searching Memory

Memories are just data, so we can manually search them if we want:

```python
# Search for color preferences
search_response = await memory_service.search_memory(
    app_name=APP_NAME, user_id=USER_ID, query="What is the user's favorite color?"
)

print("🔍 Search Results:")
print(f"  Found {len(search_response.memories)} relevant memories")
print()

for memory in search_response.memories:
    if memory.content and memory.content.parts:
        text = memory.content.parts[0].text[:80]
        print(f"  [{memory.author}]: {text}...")
```

## Callbacks

The code above *manually* saves sessions to memory. But in production systems, we need this to happen automatically. *Callbacks* are functions that execute automatically at specific stages during an agent's workflow (or when specific things happen).

**Available callback types:**

- `before_agent_callback` → Runs before agent starts processing a request
- `after_agent_callback` → Runs after agent completes its turn  
- `before_tool_callback` / `after_tool_callback` → Around tool invocations
- `before_model_callback` / `after_model_callback` → Around LLM calls
- `on_model_error_callback` → When errors occur

**Common use cases:**

- Logging and observability (track what the agent does)
- Automatic data persistence (like saving to memory)
- Custom validation or filtering
- Performance monitoring

To learn more, see the [ADK Callbacks Documentation](https://google.github.io/adk-docs/agents/callbacks/)

For memory storage, we typically want `after_agent_callback`, which will trigger the attached function whenever an agent finishes its turn.

When you define a callback function, ADK automatically passes a special parameter called `callback_context` to it. The `callback_context` provides access to the Memory Service and other runtime components.

Here's a callback function we might define:

```python
async def auto_save_to_memory(callback_context):
    """Automatically save session to memory after each agent turn."""
    await callback_context._invocation_context.memory_service.add_session_to_memory(
        callback_context._invocation_context.session
    )
```

And here's how we can create an agent that uses this callback:

```python
auto_memory_agent = LlmAgent(
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    name="AutoMemoryAgent",
    instruction="Answer user questions.",
    tools=[preload_memory],
    after_agent_callback=auto_save_to_memory,  # Saves after each turn!
)
```

And a runner to run it:

```python
# Create a runner for the auto-save agent
# This connects our automated agent to the session and memory services
auto_runner = Runner(
    agent=auto_memory_agent,  # Use the agent with callback + preload_memory
    app_name=APP_NAME,
    session_service=session_service,  # Same services from Section 3
    memory_service=memory_service,
)
```

### How often should we save sessions to memory?

| Timing | Implementation | Best For |
|--------|----------------|----------|
| **After every turn** | `after_agent_callback` | Real-time memory updates |
| **End of conversation** | Manual call when session ends | Batch processing, reduce API calls |
| **Periodic intervals** | Timer-based background job | Long-running conversations |
## Memory Consolidation

If we save raw input in memory (e.g. every user message, every agent response, every tool call), we end up with a lot of noise and a lot of tokens to process when retrieving memory. Managed services like `VertexAiMemoryBankService` automatically consolidates memories before storing them.