---
title: Randomized Controlled Trial (RCT)
draft: false
date: 2026-06-10
tags:
  - methodology/causal_inference
---
A [randomized controlled trial (RCT)](https://en.wikipedia.org/wiki/Randomized_controlled_trial) is the "gold standard" of experimental design. Appropriately designed and conducted RCTs provide some of the strongest scientific evidence for causal inference.

One fundamental application of an RCT is to test the effectiveness of some intervention. Assume researchers wanted to test whether a drug caused patients to lose weight. Researchers could test this by gathering a sample of patients, then *randomly* assigning half to receive the drug and half to receive a placebo (i.e. the *control*). They could then compare average weight loss between both groups to test the effectiveness of the drug.

The magic of an RCT comes from its use of random assignment. One of the biggest threats to [[causal inference]] comes from our inability to control potential confounding variables. Assuming we have a sufficient number of study participants, randomly assigning participants to a treatment condition is an efficient way to address confounders and ensure that participants in the treatment conditions are comparable, even across unmeasured confounders.