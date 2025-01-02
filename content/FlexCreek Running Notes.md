---
title: Flex Creek Running Notes
draft: false
date: 2025-01-02
tags:
  - go
  - web_dev
  - learn_out_loud
---
## Link to Github Repo
[FlexCreek Github Repo](https://github.com/ekholme/flexcreek)

## 2025-01-02 Update

I think I want to change what FlexCreek is. After doing a bit more thinking, I believe I want it to be essentially a workout log. Basically a high-tech workout journal. I can record movements, workouts, and my performances on workouts (along with the date I completed them) along with notes describing how I felt.

Some of the functionality will be the same, but a fair amount will be simplified by going this route, I think.

In other news, I started work on the database schema. I started small, just creating 3 tables -- `movements`, `muscles`, and `movement_muscles`. This will allow me to start putting movements in and associating each movement with the muscles it recruits. My understanding is that this 3-table structure is best for capturing many-to-many relationships.

The code is in `sql/migration.sql`, which I'll build out more once I start adding other elements (workouts, users, etc).
## 2024-12-11 Update

Some odds and ends today, and mostly just scaffolding. I set up a pretty basic server struct, a constructor to create a new server, and then methods on the server to register routes and run the server. The application doesn't do anything different than it did before, but it's got a bit more structure to it.

I also started to define a `Movement` struct, which is:

```go
type Movement struct {
    ID      int
    Name    string
    Muscles []string
}
```

This will probably be my simplest struct, so that's why I started here. Soon, I'll need to start thinking about the schema and table structures for my database...oof
## 2024-11-25 Update

I've decided to completely restart my [FlexCreek](https://github.com/ekholme/flexcreek) workout web app project. I've dabbled in this for a while, but I've never really kept momentum or gotten very far on it. But I'm hoping to have more luck this time, because I'm committing to keeping a set of running notes to document my learning while I write up the application.

The basic idea is that FlexCreek is an app to keep track of workouts. Initially, it'll be a way to log different workout structures, movements, etc. For example, I might just be able to log that I did a 20 minute AMRAP of 10 kettlebell swings, 10 box jumps, and 10 thrusters (for example). I'd also assign various tags when creating the workout, and I could then search for workouts later based on the tags, movements included, length, type of workout, etc. People would also be able to "favorite" certain workouts, and I could view my favorites.

Eventually I might also add the ability to track workout performances.

Today, I just started the project. I did the following:
- Wrote the most basic "hello world" web server;
- Wrote a `Makefile` to execute basic parts of the build process (build, run, clean)

Not very much actual coding today, but I'm excited about the process. The next step(s) are probably to define structs for my data types, then define the database schema.