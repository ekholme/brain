---
title: Context Engineering
draft: false
date: 2025-11-12
tags:
  - 5dgai
  - ai
  - agents
---
Context engineering is about dynamically managing the information in an LLM's context window, ensuring it has the most relevant information for the task it's performing.

By default, LLMs are stateless -- the only information they have access to is the information provided in the context. So if we want to make *stateful* AI tools, we need to use context engineering.

Context engineering ensures the model gets everything it needs, optimized for the current task. This can include:

- Tool definitions
- Few-shot examples to guide reasoning
- External data (pulling relevant info from memory or data stores)
- Information accessed via [[Retrieval Augmented Generation]]
- Inputs from tools the model has called
- Conversation history

## Context Management

The diagram below (taken from [this whitepaper](https://drive.google.com/file/d/1JW6Q_wwvBjMz9xzOtTldFfPiF7BrdEeQ/view)) shows the flow of context management for agents.

![](public/img/agent_context_flowchart.png)

## Context Rot

*Context rot* refers to the phenomenon when the context window is too full, which impairs the ability of the tool to achieve the task at hand and degrades performance. One of the goals of context engineering, then, is to strike the balance between providing not enough information in the context and too much.

Some straightforward (but crude) methods for preventing context rot include using only the *n* newest tokens in the conversation or using only the *k* most recent conversational turns. 

A more complex (but also probably better) approach is using *recursive summarization*, where the LLM summarizes the conversation to reduce the context. If we go this route, we have to do this asynchronously in the background, potentially using a smaller/less capable LLM (since summarization tends to be an easier task).
## Sessions

A *session* is essentially a container for a conversation with an LLM. It's the immediate stuff that an LLM has access to.

Sessions are specific to a given user and hold the context for a given conversation.

Sessions typically keep track of two different things:

1. **Events**, which are distinct things that have happened (e.g. called Tool A, sent user response X, etc.)
2. **State**, which is the essentially a scratchpad it can use to store and update details during the conversation.

See the [[Agent Session Management with ADK]] notes for a worked example managing a session with [[Google Agent Developer Kit]].
## Memory

*Memory* is how you capture a process and consolidate memories across multiple sessions. Memory provides capabilities that sessions alone can't:

| Capability | What It Means | Example |
|------------|---------------|---------|
| **Cross-Conversation Recall** | Access information from any past conversation | "What preferences has this user mentioned across all chats?" |
| **Intelligent Extraction** | LLM-powered consolidation extracts key facts | Stores "allergic to peanuts" instead of 50 raw messages |
| **Semantic Search** | Meaning-based retrieval, not just keyword matching | Query "preferred hue" matches "favorite color is blue" |
| **Persistent Storage** | Survives application restarts | Build knowledge that grows over time |

When storing data in session logs, we typically need to remove PII or other sensitive data (for compliance reasons).

Just like people, we might have both *declarative memory* and *procedural memory*.

Practically, memories are stored in a combination of [[Vector Databases]] and knowledge graphs.

### Memory Generation

Memory generation is an ETL (extract, transform, load) pipeline with a few extra considerations.

1. **Extract.** Figure out what information is most meaningful (potentially for a given person) and then extract that.
2. **Consolidate.** Figure out if we need to create a new memory, update an old memory, forget a previous memory based on new information, etc. There's a lot that goes into this that I'm not getting into here.
3. **Transform.** 
4. **Load.**

Memory generation is a compute-intensive process, so it has to happen in the background as an async process.

### Memory Extraction

Finding the most semantically similar memory isn't always the best approach. Instead, when determining which memories to retrieve, we might want to blend scores across 3 factors:

1. Relevance
2. Recency
3. Importance

Memories can be retrieved either proactively or reactively. In the proactive approach, we fetch potentially relevant memories at the start of each conversational turn. The advantage is that memories are then always available, but one disadvantage is that it potentially increases latency if we fetch memories we don't end up needing.

In the reactive approach, we might think of memory as a tool that an agent can call if it decides it's necessary. This can reduce latency, but it requires a smarter agent and potentially introduces an additional LLM call.

## Additional Links

[Google Whitepaper on Context Engineering](https://drive.google.com/file/d/1JW6Q_wwvBjMz9xzOtTldFfPiF7BrdEeQ/view)

### Kaggle Notebooks
- [Agent Sessions](https://www.kaggle.com/code/ekholme/day-3a-agent-sessions/edit?fromFork=1)
- [Agent Memory](https://www.kaggle.com/code/ekholme/day-3b-agent-memory/edit?fromFork=1)