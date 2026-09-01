---
title: Reliability
draft: false
date: 2026-08-28
tags:
  - psychometrics/reliability
  - stats/psychometrics
---
Reliability refers to the consistency of test scores. This consistency can refer to consistency over time (e.g. across multiple test administrations), consistency across multiple test forms, inter-rater reliability (consistency across raters), or internal consistency (the extent to which the items on the test are all related to one another).

Reliability as a concept is central to [[Classical Test Theory]] (CTT). Recall that in CTT, a person's observed score ($X$) is comprised of their true score ($T$) and error ($E$):
$$
X = T + E
$$

In this framework, reliability measures the proportion of observed score variance that is attributable to true-score variance:
$$
r_{\text{xx}} = \frac{\sigma_{T}^2}{\sigma_{X}^2}
$$
## Internal Consistency
When we talk about reliability in terms of internal consistency, we often use metrics such as [[Cronbach's Alpha]], [[McDonald's Omega]], or Kuder-Richardson 20 (KR-20). These metrics range from $-\infty$ to 1 (although in practice they're usually between 0 and 1) and provide an indication of the extent to which items on the test are inter-related.

The table below describes each of these metrics, when they might be appropriate, and some additional notes:

| Metric              | When to Use                                               | Additional Notes                                                                                                                          |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Cronbach's $\alpha$ | Items are continuous or polytomous and are tau equivalent | Assumes items have equal factor loadings & will underestimate reliability if this assumption is violated. Sensitive to test/scale length. |
| McDonald's $\omega$ | Items are continuous or polytomous.                       | Preferred over Cronbach's alpha because it doesn't assume equal factor loadings. Does require SEM software to estimate, though.           |
| KR-20               | Items are dichotomous                                     | KR-20 is a special case of Cronbach's alpha for binary data                                                                               |
