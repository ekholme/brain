---
title: Item Response Theory
draft: false
date: 2024-11-13
tags:
  - irt
  - psychometrics
  - stats
---
 
- Items aren't assumed to be equally difficult. IRT treats the difficulty of each item as information to be incorporated in scaling items
- As the name implies, IRT focuses on *items*, whereas classical test theory tends to focus on tests-level stuff.
- Response probabilities are a function of person and item parameters
	- Person parameters are usually construed as a single latent trait or dimension (e.g. math proficiency, general intelligence, or the strength of an attitude)
	- Item parameters include difficulty, discrimination (how the rate of success of individuals varies with their ability), and a guessing parameter (a lower asymptote on the curve)
- IRT models can be unidimensional or multidimensional. Unidimensional models assume a single latent dimension, $\theta$ , whereas multidimensional models can accommodate multiple latent dimensions/traits. Multidimensional models are much more complex, though, so most models are unidimensional in practice.
- Number of IRT parameters
	- 3PL (3 parameter logistic) model has a difficulty parameter, a discrimination parameter, and a guessing parameter
	- 2PL model has a difficulty parameter and a discrimination parameter. This type of model assumes that guessing is unlikely (e.g. "What is the square root of 121?") or doesn't apply (e.g. on personality or attitude items)
	- 1PL model just has a difficulty parameter. It assumes that all items are equally discriminant (discriminatory?)