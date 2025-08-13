---
title: Binary Cross Entropy
draft: false
date: 2025-08-13
tags:
  - stats
  - machine_learning
  - loss_function
---
Binary cross entropy (BCE; aka log-loss) is a [[Loss Functions|loss function]] associated with binary classification problems. The formula for BCE is:
$$
\text{loss} = \frac{1}{N}\sum_{i=1}^N{y_{i} \cdot \log(\hat{y_{i}})+(1-y_{i})\cdot \log(1-\hat{y_{i}})}
$$
where $\hat{y_{i}}$ is the predicted probability that $y_i = 1$ and $y_i$ is either 0 or 1.