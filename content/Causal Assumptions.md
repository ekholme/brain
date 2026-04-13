---
title: Causal Assumptions
draft: false
date: 2026-04-13
tags:
  - methodology/causal_inference
---
When [[Causal Inference|causal inference]] is the goal of an analysis, we have to make some assumptions as part of our "unconfoundedness methods." These are sometimes also referred to as *identifiability conditions*, since we need them to hold to identify causal estimates.

Three of these assumptions are *exchangeability*, *positivity*, and *consistency*.

## Exchangeability

Exchangeability assumes that each exposure group has the same potential outcomes on average. Put differently, assuming equal values for all controls/covariates, exposed and unexposed subjects have an equal likelihood of experiencing a given outcome *prior to the exposure*.

When $n \rightarrow \infty$, exchangeability is guaranteed if the exposure is randomly assigned. 

If this condition is violated, we will end up with a biased estimate of the effect of the exposure. One way to adjust for this is to see if we can achieve exchangeability within levels of another variable. This is called *conditional exchangeability.*
## Positivity

This states that within each level of combination of study variables used to achieve exchangeability, there are exposed and unexposed subjects. Put differently, each subject has some chance of experiencing every exposure level. This is violated when, for whatever reason, it would be impossible for some group to receive an exposure.
## Consistency

This is an assumption about the consistency of the exposure. We assume that, for each value of the exposure, there is no difference between subjects in the delivery of that exposure. We also assume that the outcome for any subject doesn't depend on another subject's exposure.

This is also sometimes referred to as the *stable unit treatment value assumption* or SUTVA.