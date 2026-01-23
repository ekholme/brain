---
title: Htmx
draft: false
date: 2025-06-30
tags:
  - web_development
---
[htmx](https://htmx.org/) is a Javascript library that makes it simpler to create reactive frontends by extending basic HTML with `hx-` attributes. Rather than requiring developers to use large front-end Javascript frameworks like React, htmx allows developers to write slightly modified html code to achieve reactivity. htmx allows for elements of a webpage/DOM to be updated in response to user behavior without a full page reload.

In sites built with htmx, the server will typically respond with HTML (or HTML fragments) rather than with JSON. htmx will then insert the HTML into the specified part of the page. This approach works very well with [[Go]]'s templating, making it possible to build websites with reactive front-ends using only Go and HTML templates.

## Example Application

Here's a minimal example Go application that uses htmx. It allows users of a webpage to type a value into a text box, hit a submit button, and then see the value instantly show up in the page without requiring a full page reload.
### main.go

Here's the go code for the application:

```go
package main

import (
    "html/template"
    "log"
    "net/http"
)

type app struct {
    templates *template.Template
    router    *http.ServeMux
}

func main() {
    templates := template.Must(template.ParseGlob("templates/*.go.html"))

    app := NewApp(templates)

    app.router.HandleFunc("GET /", app.handleIndex)
    app.router.HandleFunc("POST /value", app.handleValue)

    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", app.router))
}

func NewApp(templates *template.Template) *app {
    return &app{
        templates: templates,
        router:    http.NewServeMux(),
    }
}
  
func (a *app) handleIndex(w http.ResponseWriter, r *http.Request) {
    a.templates.ExecuteTemplate(w, "index.go.html", nil)
} 

func (a *app) handleValue(w http.ResponseWriter, r *http.Request) {
    val := r.FormValue("val-input")
    a.templates.ExecuteTemplate(w, "value.go.html", val)
}
```

This is all pretty standard -- it's just a basic web server with two endpoints: `GET /` and `POST /value`. Even though the application is only a single page that we'll view at the index, we still need the `POST /value` endpoint because that defines how the `<p id="value"></p>` element in the index gets updated.
### templates/index.go.html

This is the only page of the application that we'll actually see. The html looks like this:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo HTMX Page</title>

    <!-- HTMX -->
    <script src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"></script>
</head>

<body>
    <h1>HTMX Demo Page</h1>
    <h2>Input a value</h2>
    <form hx-post="/value" hx-target="#value" hx-swap="outerHTML">
        <div>
            <label for="val-input" class="form-label">
                Enter an input value:
            </label>
           <input type="text" class="form-control" id="val-input" name="val-input">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
    <br>
    <h2>Value</h2>
    <div>
        <p id="value"></p>
    </div>
</body>

</html>
```

The key things to notice here are the attributes of the `<form>`:

```html
    <form hx-post="/value" hx-target="#value" hx-swap="outerHTML">
```

This is telling our code, basically, when this form is submitted, send a `POST` request to the `/value` endpoint, then take whatever is returned by that endpoint and replace whatever is currently in the HTML element with `id="value"` with the returned contents.

### templates/value.go.html

This file defines what is returned when we make a `POST` request to the `/value` endpoint. Since we're the HTML returned from this request and inserting it back into the index, we're only returning an HTML fragment here rather than a full page. Here are the contents of the file:

```html
<p id="value">{{.}}</p>
```

That's it!

Note that the `{{.}}` notation is a placeholder for the data that gets passed into the template by the handler. So if we look back at the handler that processes this request:

```go
func (a *app) handleValue(w http.ResponseWriter, r *http.Request) {
	val := r.FormValue("val-input")
	a.templates.ExecuteTemplate(w, "value.go.html", val)
}
```

We can see that we're extracting the input from the form and then passing it into the template.