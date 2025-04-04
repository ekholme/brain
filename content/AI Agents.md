---
title: AI Agents
draft: false
date: 2025-04-02
tags:
  - 5dgai
  - ai
  - llms
---
*These notes are mostly taken from the whitepaper linked below*
## Links
- [Link to podcast](https://www.youtube.com/watch?v=D3Kaqz7VW28&list=PLqFaTIg4myu_yKJpvF8WE2JfaG5kGuvoE&index=5)
- [Link to whitepaper](https://drive.google.com/file/d/1W8EnoPXRLTQesfjvb-b3Zj-dnBf1f--n/view)
- [Google Cloud AI Agent Starter Pack Repo](https://github.com/GoogleCloudPlatform/agent-starter-pack?tab=readme-ov-file)

## What is an AI Agent?

An AI agent is an application that attempts to best achieve a goal by using the tools it has at its disposal. This means that it might use (for example) a calculator to answer one request, whereas it might make an API call to answer another, assuming it has these tools available to it.

An agent has 3 core components:
- the model
- the suite of available tools
- an orchestration component

The *model* refers to the LLM that will serve as the centralized decision maker.

*Tools* are the tools that the agent has available to it to interact with the outside world. We might think of tools as aligning with common API methods (e.g. GET, POST, PATCH, DELETE). Tools allow agents to access real-time information.

The *orchestration layer* describes a cyclical process governing how the agent takes in information, performs some internal reasoning, and uses that reasoning to inform its next action or decision. The orchestration layer can be governed by simple calculations with decision rules or by more complex machine learning or probabilistic learning techniques.

An agent's work involves (potentially multiple) cycles of planning, execution, and adjustment until a satisfactory result is produced.

[[Prompt Engineering]] is a critical component of the agent's orchestration layer, and prompting strategies that explicitly require models to iteratively work through reasoning seem to work best for agents. These are described [[Prompt Engineering#General Prompting Approaches|here]] and include strategies such as:
- ReAct
- Chain-of-Thought (CoT)
- Tree-of-thoughts (ToT)

## Example of Agent Sequencing

**Prompt from user:** I want to book a flight from Richmond to San Diego

**Thought:** I should search for flights

**Action:** Send parameterized GET request to flight tool (that the agent explicitly has access to)

**Observation:** The flight tool returns many options

**Thought:** I should present these to the user

**Final Action:** Here are some flights from Richmond to San Diego...

## Tools

There are 3 broad tool types that models are able to interact with:
- Extensions
- Functions
- Data Stores

### Extensions

Extensions are essentially components that bridge the gap between an agent and an API in a standardized way. In the previous example, we might have an extension between our agent and the Google Flights API.

The extension would need to teach the agent (via examples) how to use the API endpoint. It would also need to teach the agent what parameters are required to successfully call the API endpoint.

Extensions can be modular -- they can be crafted independent of the agent, then provided as part of the agent's configuration.

An illustration of extensions in the agent architecture is shown below:

![](/img/ai_agent_extensions.png)


![[ai_agent_extensions.png]]
Google provides several "out of the box" extensions in Vertex AI. See p. 16 of [this whitepaper](https://drive.google.com/file/d/1W8EnoPXRLTQesfjvb-b3Zj-dnBf1f--n/view) for an example using the `code_interpreter` extension.

### Functions

A model can take a set of known functions and decide when to use each function as well as what arguments the function takes. Functions differ from extensions in that:

1. A model will output a function and its arguments, but it doesn't make an API call.
2. Functions are executed on the client side, whereas extensions are executed on the agent (server) side.

So, using the flights example, the model might output something like:
`get_flights(from='richmond, to='san diego')` (or, more realistically, something like this formatted in JSON). Although this seems less efficient, there are many reasons why we might not want the agent to directly make the API call:

1. API calls need to be made by a different component of the application (e.g. they need to go through some middleware first);
2. We want to batch several API calls together;
3. Additional transformations need to be applied to the API response that the agent cannot perform
4. We might want the LLM to *suggest* a function to use, but we don't want to pass our credentials (e.g. an API key) to the LLM or extension to actually  call the function;

The image below illustrates the different between extensions and functions:

![](/img/ai_agent_functions_vs_extensions.png)
![[ai_agent_functions_vs_extensions.png]]
In general, functions offer the developer much more control over how data flows through their application than extensions do.

Page 26 of [this whitepaper](https://drive.google.com/file/d/1W8EnoPXRLTQesfjvb-b3Zj-dnBf1f--n/view) contains an example of how to write code to generate a function.

### Data Stores

Data stores allow developers to provide additional data in its original format to an agent, eliminating the need for time-consuming data transformations, model retraining, or fine-tuning. The data store [[Embeddings|converts the incoming document into embeddings]] that the agent can use.

Data stores are typically implemented as [[Embeddings#Vector Databases|vector databases]].

In a way, then, [[Retrieval Augmented Generation|RAG]] models are a subset of AI agents, in that the data stores that enable RAGs are just one possible tool that agents can access.

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