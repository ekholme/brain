---
title: Multi-Agent AI Systems
draft: false
date: 2025-11-10
tags:
  - ai
  - 5dgai
  - agents
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

### Sequential Agents

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

### Parallel Agents

The `SequentialAgent` is great if we know things need to happen in a particular order. One downside is it's slow, because everything happens in a pipeline, and subsequent agents can't start working until their predecessors are finished.

If we have tasks that aren't dependent on one another, we can create a `ParallelAgent`. Parallel agents run concurrently, and once they're all done, the results can be aggregated in a final step.

Imagine we wanted to conduct research on multiple topics, then aggregate all of this into a summary.

```python
# Tech Researcher: Focuses on AI and ML trends.
tech_researcher = Agent(
    name="TechResearcher",
    model="gemini-2.5-flash-lite",
    instruction="""Research the latest AI/ML trends. Include 3 key developments,
the main companies involved, and the potential impact. Keep the report very concise (100 words).""",
    tools=[google_search],
    output_key="tech_research", # The result of this agent will be stored in the session state with this key.
)

# Health Researcher: Focuses on medical breakthroughs.
health_researcher = Agent(
    name="HealthResearcher",
    model="gemini-2.5-flash-lite",
    instruction="""Research recent medical breakthroughs. Include 3 significant advances,
their practical applications, and estimated timelines. Keep the report concise (100 words).""",
    tools=[google_search],
    output_key="health_research", # The result will be stored with this key.
)

# Finance Researcher: Focuses on fintech trends.
finance_researcher = Agent(
    name="FinanceResearcher",
    model="gemini-2.5-flash-lite",
    instruction="""Research current fintech trends. Include 3 key trends,
their market implications, and the future outlook. Keep the report concise (100 words).""",
    tools=[google_search],
    output_key="finance_research", # The result will be stored with this key.
)

# The AggregatorAgent runs *after* the parallel step to synthesize the results.
aggregator_agent = Agent(
    name="AggregatorAgent",
    model="gemini-2.5-flash-lite",
    # It uses placeholders to inject the outputs from the parallel agents, which are now in the session state.
    instruction="""Combine these three research findings into a single executive summary:

    **Technology Trends:**
    {tech_research}
    
    **Health Breakthroughs:**
    {health_research}
    
    **Finance Innovations:**
    {finance_research}
    
    Your summary should highlight common themes, surprising connections, and the most important key takeaways from all three reports. The final summary should be around 200 words.""",
    output_key="executive_summary", # This will be the final output of the entire system.
)
```

We then create a parallel agent, which is itself a sub-agent in a `SequentialAgent` (all of the research needs to happen first, then it can be summarized)

```python
# The ParallelAgent runs all its sub-agents simultaneously.
parallel_research_team = ParallelAgent(
    name="ParallelResearchTeam",
    sub_agents=[tech_researcher, health_researcher, finance_researcher],
)

# This SequentialAgent defines the high-level workflow: run the parallel team first, then run the aggregator.
root_agent = SequentialAgent(
    name="ResearchSystem",
    sub_agents=[parallel_research_team, aggregator_agent],
)
```

### Loop Agent

One problem with the previous workflows is that all of the components are "one-shot" -- they run once and finish. There's no way to go back and refine the output of each step if it's not good enough.

A `LoopAgent` solves this problem by running a set of agents repeatedly until either

1. A specific condition is met, or
2. A max number of iterations is reached

Imagine we want to write a story. We might create a writer agent to draft the story, and a critic agent to evaluate whether the story is good enough. If not, it sends the story to a refiner agent to revise.

```python
# This agent runs ONCE at the beginning to create the first draft.
initial_writer_agent = Agent(
    name="InitialWriterAgent",
    model="gemini-2.5-flash-lite",
    instruction="""Based on the user's prompt, write the first draft of a short story (around 100-150 words).
    Output only the story text, with no introduction or explanation.""",
    output_key="current_story", # Stores the first draft in the state.
)

# This agent's only job is to provide feedback or the approval signal. It has no tools.
critic_agent = Agent(
    name="CriticAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a constructive story critic. Review the story provided below.
    Story: {current_story}
    
    Evaluate the story's plot, characters, and pacing.
    - If the story is well-written and complete, you MUST respond with the exact phrase: "APPROVED"
    - Otherwise, provide 2-3 specific, actionable suggestions for improvement.""",
    output_key="critique", # Stores the feedback in the state.
)
```

We then need a way to tell the agent to stop, which we can do with a regular python function:

```python
# This is the function that the RefinerAgent will call to exit the loop.
def exit_loop():
    """Call this function ONLY when the critique is 'APPROVED', indicating the story is finished and no more changes are needed."""
    return {"status": "approved", "message": "Story approved. Exiting refinement loop."}
```

And we define a Refiner Agent to revise the draft(s) OR call the `exit_loop()` function:

```python
# This agent refines the story based on critique OR calls the exit_loop function.
refiner_agent = Agent(
    name="RefinerAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a story refiner. You have a story draft and critique.
    
    Story Draft: {current_story}
    Critique: {critique}
    
    Your task is to analyze the critique.
    - IF the critique is EXACTLY "APPROVED", you MUST call the `exit_loop` function and nothing else.
    - OTHERWISE, rewrite the story draft to fully incorporate the feedback from the critique.""",
    
    output_key="current_story", # It overwrites the story with the new, refined version.
    tools=[FunctionTool(exit_loop)], # The tool is now correctly initialized with the function reference.
)
```

And then we can bring everything together into a `LoopAgent` (which is itself within a `SequentialAgent` since we need the initial draft first):

```python
# The LoopAgent contains the agents that will run repeatedly: Critic -> Refiner.
story_refinement_loop = LoopAgent(
    name="StoryRefinementLoop",
    sub_agents=[critic_agent, refiner_agent],
    max_iterations=2, # Prevents infinite loops
)

# The root agent is a SequentialAgent that defines the overall workflow: Initial Write -> Refinement Loop.
root_agent = SequentialAgent(
    name="StoryPipeline",
    sub_agents=[initial_writer_agent, story_refinement_loop],
)
```
