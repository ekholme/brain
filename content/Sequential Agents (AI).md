---
title: Sequential Agents (AI)
draft: false
date: 2025-11-17
tags:
  - ai/5dgai
  - ai/agents
---
Sequential Agents is a [[Multi-Agent AI Systems|multi-agent]] paradigm in which [[AI Agents]] work sequentially to accomplish a given task.

If we know we need tasks to happen in a **specific order**, we can use a `SequentialAgent` rather than relying on a prompt and hoping the model follows the instructions in the prompt to run the `ResearchAgent` before the `SummarizerAgent`.

Imagine we wanted to write a blog post. We might create a system that has 3 constituent agents:

1. An outline agent
2. A writer agent
3. An editor agent

```python
# Outline Agent: Creates the initial blog post outline.
outline_agent = Agent(
    name="OutlineAgent",
    model="gemini-2.5-flash-lite",
    instruction="""Create a blog outline for the given topic with:
    1. A catchy headline
    2. An introduction hook
    3. 3-5 main sections with 2-3 bullet points for each
    4. A concluding thought""",
    output_key="blog_outline", # The result of this agent will be stored in the session state with this key.
)

# Writer Agent: Writes the full blog post based on the outline from the previous agent.
writer_agent = Agent(
    name="WriterAgent",
    model="gemini-2.5-flash-lite",
    # The `{blog_outline}` placeholder automatically injects the state value from the previous agent's output.
    instruction="""Following this outline strictly: {blog_outline}
    Write a brief, 200 to 300-word blog post with an engaging and informative tone.""",
    output_key="blog_draft", # The result of this agent will be stored with this key.
)

# Editor Agent: Edits and polishes the draft from the writer agent.
editor_agent = Agent(
    name="EditorAgent",
    model="gemini-2.5-flash-lite",
    # This agent receives the `{blog_draft}` from the writer agent's output.
    instruction="""Edit this draft: {blog_draft}
    Your task is to polish the text by fixing any grammatical errors, improving the flow and sentence structure, and enhancing overall clarity.""",
    output_key="final_blog", # This is the final output of the entire pipeline.
)
```

We can then put these together sequentially:

```python
root_agent = SequentialAgent(
    name="BlogPipeline",
    sub_agents=[outline_agent, writer_agent, editor_agent],
)
```

