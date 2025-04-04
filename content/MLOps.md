---
title: MLOps
draft: false
date: 2025-04-04
tags:
  - ai
  - mlops
  - machine_learning
  - 5dgai
---
## 5 Phases of MLOps
- Discover
- Develop and Experiment
- Evaluate
- Deploy
- Govern

### Discover

There are lots of models available, and there's not a one-size-fits-all model that will always be the best. [[Vertex AI]] provides a [model garden](https://cloud.google.com/model-garden?hl=en), which is a curated list of models.
### Develop and Experiment

In some ways, [[Prompt Engineering]] takes the place of feature engineering when we're working with Gen AI models.

When we build AI tools, we often use strategies/approaches such as [[Retrieval Augmented Generation]] and/or [[AI Agents]]. This can lead to complex AI "chains" that call many components. When developing our tools, then, we need to think of not just each component, but also the whole chain and how data/information is passed along it.

With Gen AI, we can build prototypes with surprisingly little data.

### Evaluation

Evaluation should be end-to-end. We shouldn't just evaluate the performance of a given component (although this can help too).

Evaluation can become tricky with GenAI -- how do we evaluate the quality of an image? There are some benchmarks available, but the whole process isn't as objective as, say, evaluating a classification model.

Typically, we use manual evaluation in the early phases of a project, then move toward more automated evaluation in the latter phases.

### Deploying

The best practices for software engineering still apply here. Version control, testing, CI/CD, etc.

CI/CD can be a bit more difficult, since the output of Gen AI models will be non-deterministic. But it's still doable.

### Govern

End-to-end logging and monitoring are useful for the same reason that end-to-end evaluation is important.

Drift detection is about looking for changes in the input data over time. We're trying to understand how user behavior might be evolving.
## Further Reading

[This white paper](https://drive.google.com/file/d/1di0wyazJkwLA4VbXoBDqxveaJOwFmdJF/view) is a deep dive into MLOps using [[Vertex AI]].