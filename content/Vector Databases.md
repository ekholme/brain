---
title: Vector Databases
draft: false
date: 2025-10-16
tags:
  - machine_learning/embeddings
  - database/vector_db
  - ai
---
Vector databases are tools that combine the semantic meaning of [[Embeddings|vector embeddings]] with the efficient querying of vector search algorithms. Generally, these work as follows:

1. **Encoding (Embedding):** An embedding model (e.g. BERT, Word2Vec, Gemini, etc) is used to embed data as high-dimensional vectors. The resulting vectors will have fixed dimensions (768 for BERT, but modern models will produce larger vectors);
2. **Indexing & Augmentation:** The vectors are stored, augmented with appropriate metadata and tags, and indexed. Indexing allows for fast search
3. **Querying:** An incoming query is embedded using the *same model* as in Step 1, then the database conducts a [[Embeddings#Vector Search|vector search]] to find the most similar entries. Tags and metadata can help pre-filter some of the results (e.g. "search only documents written after 2023").

There are lots of vector database options, including:
- [ChromaDB](https://www.trychroma.com/)
- [pgvector](https://github.com/pgvector/pgvector) -- a vector extension for [[Postgres]]
- [Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/), Google's proprietary vector db
 
