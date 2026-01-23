---
title: Javascript Web Token (JWT)
draft: false
date: 2025-10-10
tags:
  - programming/web_development
  - web_development/authentication
---
A [Javascript web token (JWT)](https://www.jwt.io/introduction#what-is-json-web-token) is a compact and secure way to communicate information between two parties -- often two different web services. One feature of JWTs is that they are *signed*, which means we can trust their content & trust that the sender of the JWT is who they claim to be.

In my experience, JWTs are most commonly used for *authorization* -- allowing users to access services and resources in an application based on content in the JWT. Single sign on (SSO) is one example of how JWTs are used for authorization -- a user signs in once, and their identity is then stored in a JWT, which is passed to other services as necessary.

## Structure

A JWT consists of 3 parts, each separated by dots. They are the:
- Header
- Payload
- Signature

They look like this: `xxxx.yyyy.zzzz`

The header contains information about the token itself -- including the type (`jwt`) and the encryption algorithm (e.g. `HS256`)

The payload contains the claims contained in the token, e.g.:
```
{
  "sub": "12345",
  "name": "Eric",
  "admin": true
}
```

The signature takes the base64 encoded header and payload, the secret, and the algorithm specified in the header, and signs them. The signature is used to verify that the message in the JWT isn't changed while being transmitted. It also verifies that the sender is who it says it is.
## How JWTs Work

When someone logs into a website, it will typically return a JWT. This JWT can then be saved in a cookie. When the user wants to access a protected route, the server will check for a valid JWT and, if necessary, parse information about the user from the JWT to populate the page.

## Validation vs Verification

Validation refers to checking the structure and content of the JWT, including that everything is correctly encoded and that the token isn't expired.

Verification checks the authenticity and integrity of the token, including verifying the signature and ensuring the issuer and the audience claims match the expected issuer and audience.