---
title: AI Agents
draft: false
date: 2025-04-02
tags:
  - 5dgai
  - ai
  - llms
  - agents
---
*See also Google's [[Google Agent Developer Kit|Agent Developer Kit (ADK)]]* for tools to build agents.
## What is an AI Agent?

An AI agent is an application that attempts to best achieve a goal by using the tools it has at its disposal. This means that it might use (for example) a calculator to answer one request, whereas it might make an API call to answer another, assuming it has these tools available to it.

One potential way to differentiate between agents and LLMs is that agents are active, while LLMs are more passive. Agents can actually *do* things -- book flights, get directions, retrieve inventory from a database, etc. -- whereas LLMs by themselves "just" respond to prompts.

An agent has 3 core components:

- the model
- the suite of available [[Tools (AI Agents)|tools]]
- an orchestration component

The *model* refers to the LLM that will serve as the centralized decision maker. One of the key jobs of the model is to manage the context window & to curate what information matters for the next decision it needs to make.

*Tools* are the tools that the agent has available to it to interact with the outside world. We might think of tools as aligning with common API methods (e.g. GET, POST, PATCH, DELETE). Tools allow agents to access real-time information. Tools tend to fall into 2 different buckets:

1. Letting the model learn something new (by fetching real-time data, e.g. a weather forecast); or
2. Letting the model do something (e.g. writing to a database)

The *orchestration layer* describes a cyclical process governing how the agent takes in information, performs some internal reasoning, and uses that reasoning to inform its next action or decision. The orchestration layer can be governed by simple calculations with decision rules or by more complex machine learning or probabilistic learning techniques.

An agent's work involves (potentially multiple) cycles of planning, execution, and adjustment until a satisfactory result is produced.

[[Prompt Engineering]] is a critical component of the agent's orchestration layer, and prompting strategies that explicitly require models to iteratively work through reasoning seem to work best for agents. These are described [[Prompt Engineering#General Prompting Approaches|here]] and include strategies such as:
- ReAct
- Chain-of-Thought (CoT)
- Tree-of-thoughts (ToT)

Building a successful, production-grade agent (or system of agents) requires more than just calling the most-advanced LLM available. It requires thoughtful engineering and decisions about how the components of the agent interact.

## Examples of Agent Sequencing

### Example 1: Checking Flights for a Single Person

**Prompt from user:** I want to book a flight from Richmond to San Diego

**Thought:** I should search for flights

**Action:** Send parameterized GET request to flight tool (that the agent explicitly has access to)

**Observation:** The flight tool returns many options

**Thought:** I should present these to the user

**Final Action:** Here are some flights from Richmond to San Diego...

### Example 2: Booking Flights for a Team

**Prompt from user:** I want to book flights for my whole team to attend this conference in NYC.

**Thought:** I should look up the members of the team

**Action:** Send GET request (or something similar) to the datastore containing personnel information

**Observation:** The datastore returns a list of team members

**Thought:** I have a list of team members, now I should search for flights...

etc, etc. This cycle of think-act-observe will be repeated until the agent determines it has accomplished its goal.

## Agent Complexity

[This whitepaper](https://www.kaggle.com/whitepaper-introduction-to-agents) categorizes agents into different ordinal levels of complexity. This provides a framework for helping users scope out their architecture and determining how complex their agent needs to be.

**Level 0: Baseline.** Just the LLM on its own.

**Level 1: Connected Problem-Solver.** Connect the LLM/reasoning engine to tools. This agent can have real-time awareness.

**Level 2: Strategic Problem-Solver.** Capable of solving complex, multi-part goals. Context engineering (agent needs to be smart about crafting the input for each step) becomes relevant. 

*Example: find a coffee shop halfway between X and Y. The agent would begin by querying a Maps API and finding the midpoint. It would then send these lat/long coordinates as part of a crafted request to another API (e.g. Yelp) to find a coffee shop. Essentially we're using the output of one step to shape the input of the next step.*

**Level 3: Collaborative Multi-Agent System.** We have a team of specialists, where agents treat other agents as tools.

*Example: We want to analyze competitor pricing. We might have a "project manager" agent who sends a request to a specialized "market research" agent. The PM might take the response from the market research agent and use that to send a request to a specialized "data analytics" agent, etc.*

**Level 4: Self-Evolving System.** The system can identify gaps in its own capabilities and take steps to address these gaps.

*Example: our project manager agent might determine it needs real-time sentiment analysis data from social media. If an agent doesn't exist that can do this, the PM might call an agent-creator tool and spin up an agent that can fulfill the need in pursuit of its goal (analyze competitor pricing).*

## Models

It's important to choose the right model(s) as part of your agent. Sometimes this will be the "biggest & best" model, but sometimes it might be a smaller or more specialized model.

*Model routing* is an approach where we route different tasks to different models. We might route tasks that require complex planning to more capable models, whereas we might route simpler tasks (e.g. summarize this text) to smaller models (to optimize performance and cost).
## Tools

*See [[Tools (AI Agents)|here]] for detailed notes on agent tools*

## Orchestration Layer

The orchestration layer defines the agent's persona and the operating rules. It also helps to manage memory (short term and long term memory). *Short-term memory* is like the model's scratch pad for the current task, whereas *long-term memory* persists between sessions/tasks.

Practically, long-term memory is implemented as a [[Retrieval Augmented Generation|RAG]] system, where memories are stored in a vector database.

## Agent Quickstart with LangChain

Below is a snippet that shows how to create an AI agent that uses the SerpAPI (Google Search) and the Google Places API as extensions. This is taken directly from page 36 of [this whitepaper](https://drive.google.com/file/d/1W8EnoPXRLTQesfjvb-b3Zj-dnBf1f--n/view)

```python
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from langchain_community.utilities import SerpAPIWrapper
from langchain_community.tools import GooglePlacesTool

os.environ["SERPAPI_API_KEY"] = "XXXXX"
os.environ["GPLACES_API_KEY"] = "XXXXX"

@tool
def search(query: str):
	"""Use the SerpAPI to run a Google Search."""
	search = SerpAPIWrapper()
	return search.run(query)

@tool
def places(query: str):
	"""Use the Google Places API to run a Google Places Query."""
	places = GooglePlacesTool()
	return places.run(query)

model = ChatVertexAI(model="gemini-2.0-flash-001")

tools = [search, places]

query = "Who did the Texas Longhorns play in football last week? What is the address of the other team's stadium?"

agent = create_react_agent(model, tools)

input = {"messages": [("human", query)]}

for s in agent.stream(input, stream_mode="values"):
	message = s["messages"][-1]
	if isinstance(message, tuple):
		print(message)
	else:
		message.pretty_print()
```

## Building Production Agents with Vertex AI

The above is a quickstart that shows the building blocks of an AI agent, but it's hardly a production-ready tool. Vertex AI provides a [fully managed environment](https://cloud.google.com/products/agent-builder?hl=en) that lets users build agents with natural language inputs.

### Considerations for Agents in Production

We want to have safeguards in production that:

- prevent agents from consuming too many resources (API calls, $, network, etc.)
- prevent agents from leaking secrets/sensitive data
- prevent agents from performing risky actions

We can have another AI agent  serve as a monitor that watches for these things (among others). 

## Related Resources

- [[Multi-Agent AI Systems]]
### Links
- [Link to Spring 2025 podcast](https://www.youtube.com/watch?v=D3Kaqz7VW28&list=PLqFaTIg4myu_yKJpvF8WE2JfaG5kGuvoE&index=5)
- [Link to Fall 2025 podcast](https://www.youtube.com/watch?v=zTxvGzpfF-g)
- [Link to Spring 2025 whitepaper](https://drive.google.com/file/d/1W8EnoPXRLTQesfjvb-b3Zj-dnBf1f--n/view)
- [Link to Fall 2025 whitepaper](https://www.kaggle.com/whitepaper-introduction-to-agents)
- [Google Cloud AI Agent Starter Pack Repo](https://github.com/GoogleCloudPlatform/agent-starter-pack?tab=readme-ov-file)

### Kaggle Notebooks

- [Build your first agent using Gemini and Agent Development Kit (ADK)](https://www.kaggle.com/code/ekholme/day-1a-from-prompt-to-action/edit?fromFork=1)
- [Build a multi-agent system using ADK](https://www.kaggle.com/code/ekholme/day-1b-agent-architectures/edit?fromFork=1)
