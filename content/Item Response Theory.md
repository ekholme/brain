---
title: Item Response Theory
draft: false
date: 2024-11-13
tags:
  - stats/psychometrics
  - stats/irt
---
 
## What Is Item Response Theory?

[Item response theory (IRT)](https://en.wikipedia.org/wiki/Item_response_theory) is an approach for estimating a latent trait (often something like knowledge, but it can be an attitude or something similar) that incorporates item-specific information into the estimation of a true score. It's often contrasted with [[Classical Test Theory]].

IRT is predicated on the idea that the probability of someone getting a question (item) right is a function of:
1. the person's ability, and
2. [[#IRT Parameters|some parameters of an item]]

The person's ability is the latent trait we're interested in estimating.
 
### Item Response Theory vs Classical Test Theory
*The table below is taken from [Columbia's Mailman School of Public Health](https://www.publichealth.columbia.edu/research/population-health-methods/item-response-theory)*

| IRT                                                                                                            | CTT                                                                                                              |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| The item is the unit of analysis                                                                               | The test is the unit of analysis                                                                                 |
| Shorter measures can be more reliable than longer counterparts                                                 | Longer measures are always more reliable than shorter counterparts                                               |
| Item responses from different measures can be compared as long as they measure the same latent trait           | Comparing scores from different measures can only be done when test forms are parallel                           |
| Item properties don't depend on a representative sample                                                        | Item properties depend on a representative sample                                                                |
| Position on the latent trait continuum is derived by comparing the distance between items on the ability scale | Position on the latent trait continuum is derived by comparing the test score with scores of the reference group |
| Items can have different response categories                                                                   | All items on the measure must have the same response categories                                                  |

The biggest thing here is the treatment of the item as the unit of analysis versus the test as the unit of analysis -- basically everything else in the above table follows from this. 

## IRT Parameters

IRT models are named according to how many parameters they have. The three parameters are:

1. A **difficulty** parameter ($b_i$), which describes how difficult the item is;
2. A **discrimination** parameter ($a_i$), which describes how well an item discriminates between test-takers with lower and higher abilities. Test-takers with low ability have a much lower chance of answering a question with high discrimination correctly.
3. A **guessing** parameter ($c_i$), which incorporates the probability that a person guessed to get a correct response. This is usually only applicable for multiple choice or true/false questions.

A *3PL* (3 parameter logistic) model has all three parameters, a *2PL* model has the difficulty and discrimination parameters, and a *1PL* model has only the difficulty parameter.

A 2PL model might be appropriate for questions where it's unlikely that a person will guess the answer correctly ("What is the square root of 121?"). A 1PL model is analogous to a [[CFA|confirmatory factor analysis]] model with equal factor loadings across items. In other words, it assumes all items are equally discriminatory.
