---
title: Fine Tuning LLMs
draft: false
date: 2025-04-03
tags:
  - ai/5dgai
  - ai/agents
---
Fine-tuning an LLM involves taking an existing, pre-trained model and doing some light retraining/tuning of the parameters so that the model performs better at a given, specific task.

Fine-tuning is just one strategy for altering the behavior of LLMs. Other strategies include [[Retrieval Augmented Generation]] and creating [[AI Agents]].

Fine-tuning might be the best option for augmenting LLMs in the following cases:
- We need the LLM to adopt a very specific style when generating text output
- The output needs to have a very specific format/structure
- Reduced latency or offline use. Unlike RAG or AI Agents, fine-tuned models don't need to call any databases or external services.
- Learning complex rules. If we need the model to understand intricate physical or chemical processes, for instance.

## Example

See [this Kaggle notebook](https://www.kaggle.com/code/ekholme/day-4-fine-tuning-a-custom-model/edit) for an example of fine-tuning the [[Google Gemini|Gemini]] flash 1.5 model to better classify text data.
