---
title: Rasch Model
draft: false
date: 2026-07-22
tags:
  - stats/psychometrics
  - stats/irt
---
A [Rasch Model](https://en.wikipedia.org/wiki/Rasch_model) is a psychometric model used for analyzing assessment data. Rasch models are synonymous with one parameter logistic (1PL) [[Item Response Theory]] models.

In the framework of a Rasch model, we assume that the probability a person will answer a test question correctly is a function of two parameters:
- The ability of the person ($\theta$)
- The difficulty of the question ($b$)

This relationship is modeled via the formula:
$$
P(X_{\text{pi}}=1|\theta_{p}, b_{i}) = \frac{e^{\theta_{p}}-b_{i}}{1+e^{\theta_{p}-b_{i}}}
$$

where $\theta_p$ is the latent ability of person $p$ and $b_i$ is the difficulty of item $i$.

On a fixed-form test (i.e. one where all students get the same test form), one of the nice properties of the Rasch model is that the number of questions answered correctly is sufficient to estimate a student's ability ($\theta$). We don't need to know *which* questions the students answered correctly. This property is *raw score sufficiency.*

Another nice feature of the Rasch model is that it separates person ability from item difficulty, so we can:
- compare the ability of two students who took different versions of the same test (so long as there are some overlapping anchor items)
- compare the difficulty of questions that were answered by different groups of students.

These properties allow test makers to develop vertical scaled scores.