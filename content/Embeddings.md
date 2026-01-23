---
title: Embeddings
draft: false
date: 2025-04-01
tags:
  - ai/5dgai
  - ai/agents
  - machine_learning/embeddings
---
*These notes are largely taken from [this whitepaper](https://drive.google.com/file/d/12AI7lRBc8DQvqMGmit3mcgL3rsZwkEID/view), which is from the [[Google Gen AI Course]]*
## What Are Embeddings?

Embeddings are vector representations of things like text, image, or video. For example, the original BERT model embeds text into a 768-length vector of numbers. Theoretically, the distance/similarity between two vectors is a geometrical representation of the semantic similarity between the two objects (e.g. words) represented by the vectors. Vectors act as a form of *lossy compression.*

Embeddings are critical for multimodal AI applications, since they allow things like text, audio, and image to all be translated into the same vector representations.

### An Example with Search

We can use embeddings to search for webpages (or anything, really). When we type something into a search bar, our search gets translated into embeddings, and the model then searches a corpus of webpages -- which have already been translated into embeddings -- for those that are closest to one another.

## Applications of Embeddings

| Task                     | Description                                                                                                                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrieval                | Given a query and a set of objects (e.g. a set of texts), retrieve the most relevant objects. This task can encompass question answering and recommendations                                                                             |
| Semantic text similarity | Determine whether two sentences have the same meaning. This can include paraphrasing and duplicate detection. See [this Kaggle notebook for an example](https://www.kaggle.com/code/ekholme/day-2-embeddings-and-similarity-scores/edit) |
| Classification           | Classify objects into discrete categories. See [this Kaggle notebook for an example](https://www.kaggle.com/code/ekholme/day-2-classifying-embeddings-with-keras/edit)                                                                   |
| Clustering               | Cluster similar objects together.                                                                                                                                                                                                        |
| Reranking                | Rerank a set of objects based on a query.                                                                                                                                                                                                |
Embeddings also allow for [[Retrieval Augmented Generation]] (RAG) with LLMs. Page 54 of [this whitepaper](https://drive.google.com/file/d/12AI7lRBc8DQvqMGmit3mcgL3rsZwkEID/view) shows an example of setting up a RAG model using Vertex AI.

## Text Embeddings

The process for generating text embeddings is:

![[img/text embedding flowchart|100%]]

Tokenization refers to breaking apart text into words, wordpieces, characters, numbers, and puncation using a tokenizing technique. After the string is tokenized, each token is assigned an integer value in the range `[0, cardinality of vocabulary]`. So if we had a 16 word vocabulary (which is unrealistically small), the IDs would range from 0-15. This process is called *indexing*, and it results in a $k$-dimensional categorical representation of our text. We can one-hot encode this if we wanted, but it's typically more useful to turn this into embeddings.

### Word Embeddings

Word embeddings take these words (or subwords) and create embeddings from them. The earliest versions of these algorithms -- GloVe and Word2Vec -- were lightweight and context-free, meaning that they just looked at individual words or sub-words, not at their surrounding context.

Pages 19-22 of [this whitepaper](https://drive.google.com/file/d/12AI7lRBc8DQvqMGmit3mcgL3rsZwkEID/view) describe some of the technical details of early word embedding algorithms.

### Document Embeddings

Early approaches for creating document embeddings relied on the bag-of-words framework, where a document was assumed to be an unordered collection of words. TF-IDF (term frequency-inverse document frequency) was a foundational approach for early document embeddings.

An obvious major weakness of this approach is that  it didn't take word ordering or semantic meaning into account. Doc2Vec is an attempt to address this.

### BERT

BERT -- bidirectional encoder representations from transformers -- was introduced in 2018 and was a major shift from previous word embedding and document embedding frameworks. Some of the key elements that made BERT work so well were:
- The use of the transformer architecture
- Training on a massive unlabeled corpus
- Training by randomly masking some tokens of the input and using the masked token id as the prediction objective

## Image and Multimodel Embeddings

Image embeddings can be derive by training a convolutional neural net (CNN) on a classification task, then using the penultimate layer as the image embedding.

## Embeddings for Structured Data

I think this is just [[Principal Component Analysis (PCA)]], with the "embedding" being a row in the dataset?

## Training Embeddings

Current models typically use the dual encoder (two tower) architecture. In the context of question-answering (for example), one tower is used to encode the queries and the other is used to encode the answers. The main benefit of this approach is that it allows pre-computation of "answer" embeddings, which leads to more efficient retrieval. It also allows for different architectures to be used in each tower, or even each tower to handle different modalities (text, image, etc).

As with [[Foundational LLMs and Text Generation|other approaches]], training an embedding model typically takes 2 steps:
1. training a foundational model;
2. fine-tuning the foundational model

BERT and other large embedding models often serve as the foundational models, and these can be fine-tuned on task-specific corpuses as appropriate. See page 35 of [this whitepaper](https://drive.google.com/file/d/12AI7lRBc8DQvqMGmit3mcgL3rsZwkEID/view) for an example of fine-tuning a BERT model to feed into a text classifier.

## Vector Search

Vector search allows us to build applications that leverage the geometric similarities (distances) between vectors to return search results rather than relying on something like keyword matching.

Some common approaches for calculating the distance between vectors include:
1. Euclidean distance;
2. Cosine similarity;
3. Dot product

The most straightforward way to do this is by doing a linear search and comparing the query vector with each document/candidate vector, then choosing the one with the highest similarity. But this gets slow if we have lots of candidate documents. A more realistic approach when we have lots of documents is the [Approximate Nearest Neighbor (ANN) search algorithm](https://ignite.apache.org/docs/latest/machine-learning/binary-classification/ann). 

One way this can work is via locality-sensitive hashing (LSH), which creates a hash function that assigns similar observations to the same hash bucket. This can help because instead of having to calculate the distance between point $x$ and all $n$ candidates, we only have to compare $x$ to all $k$ hash buckets. We can think of these hash buckets as being similar to, like, a Census tract or something.

There are lots of different approaches to ANN. Another is Google's [ScaNN algorithm](https://research.google/blog/announcing-scann-efficient-vector-similarity-search/).
## Vector Databases

See the [[Vector Databases]] note.
## Evaluating Embeddings

One common framework for evaluating the quality of embeddings is to assess their ability to retrieve similar items while excluding items that are not similar. These metrics are *precision* (all documents retrieved should be relevant) and *recall* (all relevant documents should be retrieved).

These are useful metrics when relevancy is binary, but that's not always the case in the real world. If we care more about ordering the retrieved documents from most relevant to least relevant, we can use the [Normal Discounted Cumulative Gain (nDCG)](https://en.wikipedia.org/wiki/Discounted_cumulative_gain)
To evaluate embeddings, we need a dataset that contains pairs of questions and relevant documents. An example is the [NFCorpus dataset](https://huggingface.co/datasets/BeIR/nfcorpus)
## Code Examples

- See p.13-15 of [this whitepaper](https://drive.google.com/file/d/12AI7lRBc8DQvqMGmit3mcgL3rsZwkEID/view) for an example of how to calculate embeddings for a corpus of data using a pretrained embeddings model from Vertex AI

### Generate Embeddings Using Gemini

[[Google Gemini]] allows us to generate embeddings using the Python SDK doing something like this:

```python
from google import genai
from google.genai import types

# replace with our actual API key
client = genai.Client(api_key=GOOGLE_API_KEY) 

# arbitrary list of texts, but
texts = [
    'The quick brown fox jumps over the lazy dog.',
    'The quick rbown fox jumps over the lazy dog.',
    'teh fast fox jumps over the slow woofer.',
    'a quick brown fox jmps over lazy dog.',
]

response = client.models.embed_content(
	model='models/text-embedding-004',
	contents=texts,
	config=types.EmbedContentConfig(task_type='retrieval_document')
)
```

note the `task_type` in the `config` above. There are several different task types we can specify for embedding models, which are described [here](https://ai.google.dev/api/embeddings#v1beta.TaskType)
## Misc

Embeddings generated from different models may not be compatible/comparable with one another, even if the vectors are the same length. This is because each dimension doesn't necessarily have a concrete real-world referent.