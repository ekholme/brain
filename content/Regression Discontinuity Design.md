---
title: Regression Discontinuity Design
draft: false
date: 2026-05-12
tags:
  - stats/linear_model
  - methodology/causal_inference
---
[Regression Discontinuity designs](https://en.wikipedia.org/wiki/Regression_discontinuity_design) (RDDs) are quasi-experimental designs that allow us to estimate causal effects in cases where a [[Randomized Controlled Trial (RCT)]] is not feasible. They work by leveraging "natural" thresholds or cutoffs that determine an intervention, then comparing the outcomes of subjects who scored just above the threshold to receive the intervention vs. those who scored just below the threshold.

For example, suppose that a student qualifies for a reading intervention if they fail a reading SOL (earning a score lower than 400). For all intents and purposes, a student who scores a 399 has the same reading proficiency as a student who scores a 401, except the student who scored a 399 failed their SOL and the student who scored 401 passed. We can estimate the effect of this reading intervention by comparing the later outcomes of the students who just barely qualified to receive it (e.g. those who scored 395-399, give or take) against those who just barely didn't qualify (e.g. those who scored a 400-405, give or take).

This same logic can be applied to lots cases where eligibility for an intervention is dependent on crossing the threshold of some quantitative measure.

## Model

A simple linear RD model might be formulated like this:
$$
Y_{i} = \alpha + \beta D_{i} + \gamma(X_{i}-c) + \epsilon_{i}
$$

Where $D_i$ is a dummy variable indicating whether a person received the intervention and $X_i-c$ represents the distance of the score ($X$) from the cutoff ($c$). $\beta$ is the effect of the intervention.

### Kernel Weighting

We can weight observations closes to the cutoff using a weighting function known as a kernel. There are a few different kernel types, including:
- **Triangular Kernels**
- **Uniform Kernels**
- **Gaussian Kernels**

The names of these kernels correspond to the shape and how they weight data.

Kernel estimators rely on a *bandwidth* parameter, $h$. The bandwidth determines the window around the cutoff that contributes data to the model. The choice of bandwidth is an example of the [[Bias Variance Tradeoff]], since narrow bandwidth will yield a high variance/low bias model, and vice versa.

When we actually apply a kernel, $K$, the model will attempt to minimize a weighted sum of squares, similar to how [[Regularized Regression]] works (n.b. that the models are different, but the idea of weights is similar).

For each observation, we calculate the weight as:
$$
w_{i} = K(\frac{X_{i}-c}{h})
$$
where $K$ is the kernel function.

We then minimize:
$$
\sum_{i=1}^n{Y_{i} - \alpha-\beta D_{i} - \gamma(X_{i}-c)}^{2} \cdot w_{i}
$$
