---
title: Javascript Web Token (JWT)
draft: false
date: 2025-10-10
tags:
  - web_dev
  - auth
---
A [Javascript web token (JWT)](https://www.jwt.io/introduction#what-is-json-web-token) is a compact and secure way to communicate information between two parties -- often two different web services. One feature of JWTs is that they are *signed*, which means we can trust their content & trust that the sender of the JWT is who they claim to be.

In my experience, JWTs are most commonly used for *authorization* -- allowing users to access services and resources in an application based on content in the JWT. Single sign on (SSO) is one example of how JWTs are used for authorization -- a user signs in once, and their identity is then stored in a JWT, which is passed to other services as necessary.

## Structure

TODO

## How JWTs Work

TODO