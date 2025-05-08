---
title: Middleware
draft: false
date: 2025-05-05
tags:
  - go
  - web_dev
---
In a web server, a middleware is a function that sits between the incoming request and the final handler function. It takes the incoming request and performs some action on it before passing it along to the final handler function.

Some typical use cases for middleware include logging, authorization, and authentication, among others.

Middlewares can be (and often are) chained together. So, a logging middleware could pass a request to an authentication middle, which could then pass the request to the actual handler function.

## Pattern

In [[Go]], a middleware is just a function that takes an `http.Handler` as an argument and returns an `http.Handler` as a result, e.g.

```go
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//preprocessing logic here

		//call next handler in chain
		next.ServeHTTP(w, r)

		//any post-processing logic here
	})
}
```

### An Example

Assume we have some custom `Server` struct that has the following fields:

```go
type Server struct {
	Router *http.ServeMux
	Srvr *http.Server 
	Logger *slog.Logger //structured logger
}
```

And if we wanted to write some logging middleware that could use this `Logger`, we could write a method on a server like this:

```go
func (s *Server) LoggingMiddleware(next http.Handler) http.Handler {
	  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	  start := time.Now()

	  next.ServeHTTP(w, r)

	  duration := time.Since(start)

	  s.Logger.Info("request received",
		  slog.Time("timestamp", time.Now()),
		  slog.String("method", r.Method),
		  slog.String("path", r.URL.Path),
		  slog.String("remote_addr", r.RemoteAddr),
		  slog.Duration("duration", duration)
	  )
  })
}
```

And then to use this on a given route, we wrap our `HandlerFunc` in the middleware:

```go
s.Router.Handle("GET /", s.LoggingMiddleware(http.HandlerFunc(s.handleIndex))) //assumes we have some handleIndex method defined
```