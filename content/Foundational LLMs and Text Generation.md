---
title: Foundational LLMs and Text Generation
draft: false
date: 2025-03-31
tags:
  - ai
  - llms
  - 5dgai
---
These are notes from the introductory unit of Google's 5-Day Gen AI Intensive Course
## Links
[Link to Podcast](https://www.youtube.com/watch?v=Na3O4Pkbp-U&list=PLqFaTIg4myu_yKJpvF8WE2JfaG5kGuvoE&index=2) 
[Link to Whitepaper](https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation)

## Misc Notes

- Transformer architecture underlies most modern LLMs
- Before being passed into a transformer, text is tokenized.
- Then, tokenized text is transformed into embeddings -- dense vectors that capture the meaning of the token
- Transformers process all tokens at the same time, so data about position is captured, too, otherwise we'd just have a bag-of-words type model.
- Early transformers used an encoder/decoder architecture, but many modern LLMs use a decoder-only architecture, which is a simpler design that still makes sense for generating text. GPT-1 was one of the earliest decoder-only models.
	- BERT, on the other hand, is *encoder only*. BERT can understand, but can't talk (colloquially)
- 

## Self-Attention

Consider the sentence *"the tiger jumped out of a tree to get a drink of water because it was thirsty."* How does a model know that *it* refers to the tiger and not the tree? Self-attention.

Transformers create query, key, and value vectors for each word. The *query* vector basically asks "which other words in this corpus are important for understanding me" (where "me" is a given word/token). The key is just a key. The value is the information the word carries. The model will calculate a score for how well each key matches up with all of the other keys. Then the model assigns weights to each key. These are *attention weights*. These weights let us weight how much attention to place on other words in the corpus.

*Multi-headed attention* just means multiple simultaneous instances of paying attention. So one head might look at grammar, one might look at connections among words, etc.

## Feed-Forward Layer

As in other model architectures, data is fed forward between layers. And a non-linear activation function (e.g. ReLU) sits between the layers.

## Mixture of Experts (MoE)

One challenge is to make models bigger/more capable without making them slow. Mixture of experts (MoE) is a solution to this, where we use specialized sub-models (experts) that are all part of a bigger model. There's then a component that decides which sub-model would be best at performing a given task, and the task is passed off to that sub-model. So even though a model might be billions of parameters, for any given input, only a small fraction of those parameters are active.

## Open Source Models

From Google, we have the [Gemma](https://ai.google.dev/gemma) family of models. There's a 2B parameter version that can run on a single GPU.

## Training

Training a model usually takes place in 2 steps:
1. pre-training;
2. fine-tuning

Pre-training involves training a base model on a huge set of data. This is expensive and time-consuming.

Fine-tuning involves taking the base-model and specializing it on a specific task or a specific domain. Supervised fine tuning (SFT) involves training the model on labeled examples, and is how we fine-tune the model. Reinforcement learning from human feedback (RLHF) is a way we can use human preferences to help train a model.

Fine tuning can be expensive, too, depending on the approach. Performance-enhanced fine-tuning (PEFT) involves only retraining a small subset of weights in a base model, which can be much more cost- and time-efficient. Adapter-based fine tuning is an example of this, where small "adapter" components are added, and only these adapters are trained.

## [[Prompt Engineering]]

Prompt engineering is the practice of creating prompts to best solicit the information you want from a model. We want to be intentional about the prompts we pass in, since these determine the response we receive.

*Zero-shot prompting*: directly asking a model a question or providing a set of instructions without giving any examples. This relies entirely on the model's knowledge.

*Few-shot prompting*: giving the model multiple examples to show, for example, the nature of the problem or the output format you want.

*Chain of reasoning prompting*: telling the model how to think through a specific task. This is useful for difficult or complex tasks. This might involve telling the model how to break down a complex tasks.

## Evaluating LLMs

Traditional metrics like accuracy and F1 score don't really summarize how well LLMs perform.

We often need to define what "good" means when evaluating a model. Does it mean correctness? Helpfulness? Creativity? Adherence to a style?

We can use humans to provide qualitative judgments of LLMs, but we can also use custom AI models (autoraters) to evaluate other LLMs.

## Optimizing Inference

Larger models are typically slower, and when we put models into production, we don't necessarily want to optimize for (say) accuracy or correctness if that means the model is very slow. So it might be reasonable to trade a small amount of correctness for a considerable increase in speed.

Quantization is one way to speed up these models. This entails using lower-precision weights. So, for example, instead of using 32-bit floats, we might use 8-bit integers, which makes the whole model much smaller, and can lead to only a small drop in accuracy.

Distillation is another way to improve efficiency. This means using a large teacher model to train a small student model.