---
title: Retrieval Augmented Generation (RAG)
draft: false
date: 2025-04-01
tags:
  - ai
  - llms
  - embeddings
---

Retrieval Augmented Generation (RAG) is a technique that allows LLMs to incorporate information that they weren't trained on into their knowledge base without having to retrain or fine-tune the models.

A RAG system has 3 stages:
1. Indexing
2. Retrieval
3. Generation

## Indexing

Indexing happens ahead of time/offline. It's essentially the process of loading relevant documents into the [[Embeddings#Vector Databases|Vector database]] that powers the RAG. Implicit in indexing is the whole process of generating the embeddings.

## Retrieval

Retrieval is exactly what it sounds like -- retrieving documents from the vector database (i.e. performing [[Embeddings#Vector Search|vector search]]) that are most relevant to a given query. The database will handle the heavy lifting here for us, so we don't need to implement cosine similarity or anything like that ourselves.

## Generation

This final step in the process is to generate an answer to the question. It may not be sufficient to just pass the most relevant document(s) back to the user, so instead, we pass the retrieved documents, along with some context, into a prompt sent to an LLM.

For example, we might do something like this to construct a prompt that goes to an LLM:

```python
query_oneline = query.replace("\n", " ")

# This prompt is where you can specify any guidance on tone, or what topics the model should stick to, or avoid.
prompt = f"""You are a helpful and informative bot that answers questions using text from the reference passage included below. 
Be sure to respond in a complete sentence, being comprehensive, including all relevant background information. 
However, you are talking to a non-technical audience, so be sure to break down complicated concepts and 
strike a friendly and converstional tone. If the passage is irrelevant to the answer, you may ignore it.

QUESTION: {query_oneline}
"""

# Add the retrieved documents to the prompt.
for passage in all_passages:
    passage_oneline = passage.replace("\n", " ")
    prompt += f"PASSAGE: {passage_oneline}\n"

print(prompt)
```
## Implementation

For a minimal example of implementing RAG in Python with ChromaDB and the [[Google Gemini|Gemini API]], see [this Kaggle notebook](https://www.kaggle.com/code/ekholme/day-2-document-q-a-with-rag/edit)