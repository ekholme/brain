---
title: Google Agent Developer Kit (ADK)
draft: false
date: 2025-11-10
tags:
  - ai/5dgai
  - ai/agents
  - programming/go
  - programming/python
---
 
Google's [Agent Developer Kit](https://google.github.io/adk-docs/#) is a flexible and modular framework for developing and deploying agents using [[Python]], [[Go]], and Java.

## Installation

`pip install google-adk`

## Creating an Agent

*All  code snippets in this note are in python unless stated otherwise*

An agent can be created using the `Agent` constructor and defining the necessary components:

```python
from google.adk.agents import Agent
from google.adk.runners import InMemoryRunner
from google.adk.tools import google_search
from google.genai import types

root_agent = Agent(
	name="helpful_assistant",
	model="gemini-2.5-flash-lite",
	description="a simple agent that can answer general questions."
	instruction="You are a helpful assistant. Use Google Search for current info or if unsure."
	tools=[google_search],
)

```

## Running an Agent

We need a way to run our agent. For a demo, we can just do it all in memory, so we create an in-memory runner:

```python
runner = InMemoryRunner(agent=root_agent)
```

We can then run a prototype of this agent using the `.run_debug()` method. This creates a session suitable for prototyping but not for production.

```python
response = await runner.run_debug("What is Agent Development Kit from Google? What languages is the SDK available in?")
```