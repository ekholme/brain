---
title: Machine Learning Pipeline
draft: false
date: 2025-08-19
tags:
  - machine_learning
---
Broadly, building a machine learning model involves the following steps:

1. Splitting the data into train, test, and validation sets;
2. Preprocessing the training data;
3. Defining a model (or multiple models) to be fit;
4. Training the model(s) using the training data;
5. Evaluating the performance of the model(s) on the training and/or validation data; and
6. Finalizing the model

## Steps
### 1. Splitting data into train, test, and validation sets

The first step of the model building process is to split the data into at least a train and test set. Reserving a portion (typically about 20%) of the data as a test set gives us a way to evaluate the performance of our model on data it hasn't been exposed to. This gives us a way to diagnose potential overfitting.

Optionally, we can also reserve a validation set that we can use to evaluate the model performance during the training process, but this may not always be a viable approach if our $n$ is small.

### 2. Preprocessing the training data

There's a lot that goes into preprocessing, but basically this entails taking predictor/feature columns in the data and transforming them into a representation that's best suited for the model we want to fit. Sometimes preprocessing steps are necessitated by the choice of model -- for instance, linear and generalized linear models require categorical predictors to be encoded into numerical values. In other cases, the preprocessing choices are the result of the problem space/domain expertise. For instance, if we're predicting subway ridership, we might decide to create a binary `weekend` variable from a date-time variable if we believe ridership systematically differs on the weekends.

In an ML context, the goal of preprocessing is usually to give the model the predictors that generate the best predictions, but we can also preprocess variables to better facilitate inferences, too.

### 3. Defining a model (or multiple models) to be fit

In this step, we choose candidate models that we believe best serve our purpose. This might be a linear regression, a boosted tree model, a random forest, or something else. If our goal is prediction, we probably want to choose multiple models and see which performs best on our data.

### 4. Training the model(s) on training data

Once we've preprocessed our data and defined our models, we need to fit the models to our training data. This means we're using the data to estimate parameters of the models. This is also the phase during which we would perform any *hyperparameter tuning* -- fitting several models with different hyperparameter values and seeing which generates the best predictions.

### 5. Evaluating the model performance

Once we've fit our models, we want to see how well they generate predictions. To do this, we tend to use some metric that quantifies the performance of our model. There are lots of different choices, and the right choice will differ depending on different model types (e.g. classification vs regression) and domains. Some common performance metrics include mean-squared error (for regression models) and accuracy (for classification models).

### 6. Finalizing our model

If we fit multiple models -- or the same model with multiple candidate hyperparameter values -- then the last step is to choose the best model. This is often the one with the best performance, but we might also opt to choose the simplest model that is "close enough" to the best-performing model (e.g. within one standard error).

## Frameworks

The 3 languages I tend to use for ML tasks are [[R]], [[Python]], and [[Julia]]. Each of these languages has its own meta-framework for building ML models, although it's also possible to build all of these "from scratch."


| Language | ML Framework                                    |
| -------- | ----------------------------------------------- |
| R        | [tidymodels](https://www.tidymodels.org/)       |
| Python   | [sklearn](https://scikit-learn.org/stable/)     |
| Julia    | [MLJ](https://juliaai.github.io/MLJ.jl/stable/) |

