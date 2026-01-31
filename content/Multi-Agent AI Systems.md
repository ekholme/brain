---
title: Multi-Agent AI Systems
draft: false
date: 2025-11-10
tags:
  - ai/5dgai
  - ai/agents
---
## Why Multi-Agent Systems?

[[AI Agents]] are powerful. But if a task becomes complex, asking a single agent to keep track of all of the instructions can be problematic. It gets hard to debug and maintain, plus it can produce unreliable results.

Instead of one "do-it-all" agent, we can build a multi-agent system, where the team is comprised of multiple (simpler) specialized agents that work together. In these teams, each agent has a clear job to perform (e.g. Agent A does research, Agent B summarizes the research).

In a way, opting for a multi-agent system is similar to writing modular code. We tend to prefer modular code because it's easier to test, maintain, and reason about.

## Implementation with ADK

See [this Kaggle notebook](https://www.kaggle.com/code/ekholme/day-1b-agent-architectures/edit) for an example implementation of a multi-agent system using [[Google Agent Developer Kit]]. Some selected snippets are below:

### Create Individual Agents

```python
# Research Agent: Its job is to use the google_search tool and present findings.
research_agent = Agent(
    name="ResearchAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a specialized research agent. Your only job is to use the
    google_search tool to find 2-3 pieces of relevant information on the given topic and present the findings with citations.""",
    tools=[google_search],
    output_key="research_findings", # The result of this agent will be stored in the session state with this key.
)

# Summarizer Agent: Its job is to summarize the text it receives.
summarizer_agent = Agent(
    name="SummarizerAgent",
    model="gemini-2.5-flash-lite",
    # The instruction is modified to request a bulleted list for a clear output format.
    instruction="""Read the provided research findings: {research_findings}
Create a concise summary as a bulleted list with 3-5 key points.""",
    output_key="final_summary",
)
```

### Create a Coordinator Agent

A naive implementation might look like this:

```python
root_agent = Agent(
    name="ResearchCoordinator",
    model="gemini-2.5-flash-lite",
    # This instruction tells the root agent HOW to use its tools (which are the other agents).
    instruction="""You are a research coordinator. Your goal is to answer the user's query by orchestrating a workflow.
1. First, you MUST call the `ResearchAgent` tool to find relevant information on the topic provided by the user.
2. Next, after receiving the research findings, you MUST call the `SummarizerAgent` tool to create a concise summary.
3. Finally, present the final summary clearly to the user as your response.""",
    # We wrap the sub-agents in `AgentTool` to make them callable tools for the root agent.
    tools=[
        AgentTool(research_agent),
        AgentTool(summarizer_agent)
    ],
)
```

## Types of Multi-Agent Systems

The 3 main types/architectures of multi-agent systems supported by [[Google Agent Developer Kit]] are:

- [[Sequential Agents (AI)]]
- [[Parallel Agents (AI)]]
- [[Loop Agents (AI)]]