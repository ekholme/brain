---
title: Github Actions
draft: false
date: 2026-06-10
tags:
  - programming/devops
---
[Github Actions](https://github.com/features/actions) (GA) is a continuous integration/continuous deployment (CI/CD) tool that automates software development and deployment for repositories hosted on Github.

GA allows you to write workflows (via YAML files) that are executed whenever an event/trigger occurs. This can be a manual invocation, but is typically something like "whenever I push to `master`" or "whenever a pull request is opened" or "Friday mornings at 9 a.m."

The workflows specify what needs to happen. This includes how to set up the virtual machine that will run the actions (e.g. what OS to use, what system libraries to install, etc.) as well as what actions ought to be performed. Often, actions include things like running tests and, if the tests pass, deploying the resulting software (or something similar).

One nice feature of GA is that it integrates seamlessly with repositories already hosted in Github, meaning we don't need to configure another CI/CD service. We can simply configure workflows inside a `.github/workflows` folder.