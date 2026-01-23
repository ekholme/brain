---
title: Bayes Rule
draft: false
date: 2025-04-25
tags:
  - stats/bayesian
---
[Bayes' Rule](https://en.wikipedia.org/wiki/Bayes%27_theorem) (or Bayes' Theorem) gives the posterior probability of an event, $A$, conditional on some other event, $B$. It is useful for estimating the probability of a cause (A) given its effect (B).

The formula for Bayes Rule is:
$$
P(A|B) = \frac{P(B|A)\cdot P(A)}{P(B)}
$$

More generally, we can write this in plain English as:
$$
\text{posterior} = \frac{\text{prior}\cdot \text{likelihood}}{\text{normalizing constant}}
$$
## Example

For example, consider the following scenario:

> You have two biased coins. Coin A has a probability of landing heads (H) of 0.6, and Coin B has a probability of landing heads of 0.3. You randomly select one of the coins with equal probability and flip it. The result of the flip is heads. What is the probability that you selected Coin A?

We want to estimate the probability of coin A (the cause) given the effect (that we're seeing heads), and we would set the formula up as:
$$
P(A|Heads) = \frac{P(Heads|A)\cdot P(A)}{P(Heads)}
$$
And 
$$
P(Heads) = P(Heads|A) * P(A) + P(Heads|B) * P(B)
$$
And from there we just plug and play.

## Likelihood Approach

We can also write the formula using a [[likelihood]] instead of a probability, since a likelihood is (kind of) just the inverse of a probability. In this formulation, we would write:
$$
P(A|B) = \frac{L(A|B)\cdot P(A)}{P(B)}
$$
