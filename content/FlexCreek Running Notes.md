---
title: Flex Creek Running Notes
draft: false
date: 2024-11-25
tags:
  - go
  - web_dev
  - learn_out_lout
---
## 2024-11-25 Update

I've decided to completely restart my [FlexCreek](https://github.com/ekholme/flexcreek) workout web app project. I've dabbled in this for a while, but I've never really kept momentum or gotten very far on it. But I'm hoping to have more luck this time, because I'm committing to keeping a set of running notes to document my learning while I write up the application.

The basic idea is that FlexCreek is an app to keep track of workouts. Initially, it'll be a way to log different workout structures, movements, etc. For example, I might just be able to log that I did a 20 minute AMRAP of 10 kettlebell swings, 10 box jumps, and 10 thrusters (for example). I'd also assign various tags when creating the workout, and I could then search for workouts later based on the tags, movements included, length, type of workout, etc. People would also be able to "favorite" certain workouts, and I could view my favorites.

Eventually I might also add the ability to track workout performances.

Today, I just started the project. I did the following:
- Wrote the most basic "hello world" web server;
- Wrote a `Makefile` to execute basic parts of the build process (build, run, clean)

Not very much actual coding today, but I'm excited about the process. The next step(s) are probably to define structs for my data types, then define the database schema.