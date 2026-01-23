---
title: Gradient Descent
draft: false
date: 2024-11-15
tags:
  - stats/algorithms
  - programming/julia
---
 
## What is Gradient Descent?

[Gradient Descent](https://en.wikipedia.org/wiki/Gradient_descent), or Stochastic Gradient Descent, is a machine learning algorithm that optimizes parameter estimates for a model by (slowly) adjusting the estimates according to gradients (partial derivatives) and some loss function. The 7 "steps" of gradient descent, according to Jeremy Howard's [fastai course](https://course.fast.ai/) on [[Deep Learning Overview|deep learning]], are:

1. Initialize the parameters;
2. Use parameters and input data to predict an outcome;
3. Calculate the model's loss;
4. Calculate the gradient (partial derivative for each model parameter);
5. Update the parameter estimates using the gradient multiplied by some learning rate;
6. Repeat steps 2-5;
7. Stop according to some criteria (number of iterations, hitting a threshold re: model improvement).

The gradient descent algorithm is flexible enough to optimize the parameter estimates of arbitrary (but differentiable) functions, which makes it useful for machine learning, and deep learning in particular.

## Gradient Descent Implementation

Below is the basic gradient descent algorithm for a regression problem using mean-square error as the loss function implemented in [[Julia]]. You can see a full worked example [here](https://leakybrain.ericekholm.com/stats/gradient_descent)

```julia
#first we define a loss function
function mse_loss(X, y, b)
	ŷ = X * b
    l = mean((y .- ŷ) .^ 2)
    return l
end

function grad_descent(X, y; lr=0.01, tol=0.01, max_iter=1_000, noisy=false)
    #randomly initialize betas
    β = rand(size(X)[2])
    
    #init error to something large
    err = 1e10

    #initialize iterations at 0
    iter = 0

    #define a function to get the gradient of the loss function at a given set of betas
    d(b) = ForwardDiff.gradient(params -> mse_loss(X, y, params), b)

    while err > tol && iter < max_iter
        β -= lr * d(β)
        err = mse_loss(X, y, β)
        if (noisy == true)
            println("Iteration $(iter): current error is $(err)")
        end
        iter += 1
    end
    return β
end
```