---
title: Causal Estimands
draft: false
date: 2026-08-26
tags:
  - methodology/causal_inference
---
A causal estimand is the metric we estimate to answer a specific causal question. Different causal questions will have different estimands associated with them, so it's important to consider the actual question we want to answer when we specify our models and estimate these quantities.

Some of the more common causal estimands are:

## Average Treatment Effect (ATE)
**Definition:**  the expected causal effect if *everyone* in the population were treated (when compared to if *nobody* is treated). 

**Formula:**
$$
ATE = E[Y(1) - Y(0)]
$$

**Application:** Universal policy decisions (e.g. what would happen if we rolled out this intervention to everyone?)

## Average Treatment Effect among the Treated (ATT)
**Definition:** the average effect among people who *actually received* the treatment.

**Formula:**
$$
ATT = E[Y(1) - Y(0) | A = 1]
$$

**Application:** Evaluating voluntary programs or existing interventions (e.g. how much did this intervention benefit the people who chose to sign up?)

## Average Treatment Effect among the Untreated (ATU)
**Definition:** The average effect among the people who *did not* receive the treatment.

**Formula:**
$$
ATU = E[Y(1) - Y(0) | A = 0]
$$
**Application:** Assessing expansion potential (e.g. what gains would non-participating eligible people see if we expanded access?)

## Conditional Average Treatment Effect (CATE)
**Definition:** The average effect among people with a particular combination of covariates (i.e. the average effect within a given subgroup)

**Formula:**
$$
CATE(x) = E[Y(1) - Y(0) | X = x]
$$

**Application:** Heterogenous treatment effects or targeted interventions (e.g. what's the effect on students with low prior achievement?)
## Intent to Treat Effect (ITT)
**Definition:** The effect of being *assigned* to the treatment, regardless of actual compliance.

**Formula:**
$$
ITT = E[Y(Z=1) - Y(Z=0)]
$$
where $Z$ is the treatment assignment

**Application:** Real-world trials or policy rollouts where perfect compliance is essentially impossible.

## Hypothetical Scenario
Imagine we have a school with 1,000 students that is piloting an AI-assisted reading intervention and wants to estimate the effect of this intervention on student reading comprehension scores. Students are given the opportunity to voluntarily sign up for the intervention. Here's how these different estimands address different questions that the school might have.

### ATE
*What would happen to our overall reading scores if we made this program mandatory for all students?*

This would be an appropriate question if the school was considering buying the application for all students.

### ATT
*How much did the intervention help the 50 students who voluntarily signed up?*

We might ask this question if the school wants to know if the software was worth the cost for the students who actually used it.

### ATU
*If we expanded this program to the 950 students who didn't sign up, how much would they benefit?*

We might ask this if the pilot was a success and we want to target non-participants in the future.

### CATE
*Does the program work better for ELs or for native English speakers?*

If we have a limited budget, we might want to ask for whom the program works best so we can target those students.

### ITT
*What is the impact of **offering** this program to students, accounting for the fact that some students will skip it.*

If we have a situation where we offer the program to 200 students ($Z$ = 1) but only 120 use it ($A$ = 1), we might be more interested in the ITT than in the ATT, since this is probably a more realistic estimate of the effect we might expect to see (assuming some noncompliance).
## See Also
- [[Causal Inference]]