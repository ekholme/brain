---
title: Ordinal Logistic Regression
draft: false
date: 2026-07-01
tags:
  - stats/classification
  - stats/glm
  - stats/linear_model
---
An ordinal logistic regression is a statistical model appropriate for modeling an ordered factor response.

Mechanically, the model assumes there's an underlying latent variable (e.g. math proficiency) that each observation possesses. However, our available measure of this latent variable is ordinal (e.g. we might know if a student failed, passed, or passed-advanced a test). The model assumes the underlying latent variable follows a standard logistic distribution, and then it finds the optimal cut-points in this distribution that would best classify observations into the available ordinal categories. We assume these cut points are *fixed.*

Then, the predictors serve to shift the entire distribution for each observation relative to the fixed cut-points. So, if a student scored high one some pre-test that we were using to predict an ordinal variable representing math proficiency, this predictor would likely shift that student's entire distribution "to the right" relative to the fixed cut-points previously established, increasing the predicted probability for pass advanced, etc.
## See also
- the [polr function from the MASS R package](https://www.rdocumentation.org/packages/MASS/versions/7.3-65/topics/polr) provides an implementation for fitting an ordinal logistic regression in [[R]]