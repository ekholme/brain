---
title: Tools (AI Agents)
draft: false
date: 2025-11-11
tags:
  - ai/5dgai
  - ai/agents
---
*Tools* are the tools that an [[AI Agents|AI agent]] has available to it to interact with the outside world. We might think of tools as aligning with common API methods (e.g. GET, POST, PATCH, DELETE). Tools allow agents to access real-time information. Tools tend to fall into 2 different buckets:

1. Letting the model learn something new (by fetching real-time data, e.g. a weather forecast); or
2. Letting the model do something (e.g. writing to a database)

Tools are often made available through the [[Model Context Protocol (MCP)]], which (among other things), provides a set of standards for exposing and defining tools.

## Tool Types

There are 3 broad tool types that models are able to interact with:

- Extensions
- Functions
- Data Stores

### Extensions

Extensions are essentially components that bridge the gap between an agent and an API in a standardized way. In the previous example, we might have an extension between our agent and the Google Flights API.

The extension would need to teach the agent (via examples) how to use the API endpoint. It would also need to teach the agent what parameters are required to successfully call the API endpoint.

Extensions can be modular -- they can be crafted independent of the agent, then provided as part of the agent's configuration.

An illustration of extensions in the agent architecture is shown below:


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

## Best Practices for Tool Use

### Write good documentation

Essentially, we want to just write good documentation for AI tools, just like we would for any other piece of software.

- **Use clear names.** `create_critical_bug_in_jira_with_priority` is better than `update_jira`.
- **Describe all input and output parameters.** This should also include type declarations.
- **Simplify parameter lists.** If the parameter list gets too long, we probably need a class/object we can pass as a parameter.
- **Clarify tool descriptions.**
- **Add targeted examples.**
- **Provide default values.**

### Describe actions, not implementations

Tell what the tool does, not how it does it.

### Publish tasks, not API calls

Avoid creating tools that are just thin wrappers over API calls. Tools should clearly capture the actions the agent might take on behalf of the user, and document the action(s) and the parameters needed. For example, we want a task called `book_meeting_room()`, not `call_reservation_api()`

### Make tools as granular as possible.

This is basically the same as writing granular functions. Define clear responsibilities for the tool, and avoid creating tools that take many steps or perform multiple actions (except in some exceptional cases).

### Design for concise output

Avoid returning large responses, which can eat up the output context of an LLM. Where possible, instead of returning a large query result or file to an LLM directly, instead write it to a temporary database table and allow the model (or a subsequent tool) to access this table. Artifact Service in [[Google Agent Developer Kit]] provides persistent external storage as part of the ADK.

### Validate IO

We should always be validating tool inputs and outputs.

### Provide descriptive error messages

This can help us understand how our tools/agents are failing and how we can improve them moving forward.

## Additional Links

### Kaggle Notebooks

- [Agent Tools](https://www.kaggle.com/code/ekholme/day-2a-agent-tools/edit). This notebook shows how to create an agent with access to [[Custom AI Agent Tools|custom tools]].
- [Agent Tools 2]. This notebook shows how to [[Model Context Protocol (MCP)#Example Using MCP with Agents|create agents with MCP tools]] and how to create agents that pause operations for human input.

