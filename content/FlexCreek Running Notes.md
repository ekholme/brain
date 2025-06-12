---
title: Flex Creek Running Notes
draft: false
date: 2025-02-14
tags:
  - go
  - web_dev
  - learn_out_loud
---
## Link to Github Repo
[FlexCreek Github Repo](https://github.com/ekholme/flexcreek)

## 2025-06-12

I had a little bit of time to work today, so I defined a `User` type, which I realized I hadn't done yet. I also started to define some of the database schema, but I didn't get that far. I definitely haven't defined all of the links between the tables yet.
## 2025-06-06

I've been swamped lately, so I haven't had a ton of time to work. I spent some time today defining the other core structs that I'll use in this application, namely a `MovementInstance` and a `Workout`

The general idea is that a workout a `Movement` is something like a squat, a `MovementInstance` is an instance of that movement (e.g. doing 5x5 squats at 225 on June 6), and a `Workout` is a collection of one or more `MovementInstances` on a given day (e.g. on June 6, I did 5x5 squats at 225 and a 30 minute run).

I still need to define the service interfaces that implement methods on these types. I also still need to define the actual database structure, which will take some thought. That's probably the next step.
## 2025-05-29

Only spent a little bit of time working today, but I redefined a movement struct. It's much simpler this time, because I think I want this to transition to a workout/performance tracking app rather than a workout recommender. So the signature is

```go
type Movement struct {
    ID          int       `json:"id"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    CreatedAt   time.Time `json:"createdAt"`
    UpdatedAt   time.Time `json:"updatedAt"`
}
```

At least that's what it is for now. And I defined a `MovementService` interface:

```go
type MovementService interface {
    CreateMovement(ctx context.Context, m *Movement) (int, error)
    GetMovementByID(ctx context.Context, id int) (*Movement, error)
    GetMovementByName(ctx context.Context, name string) (*Movement, error)
    GetAllMovements(ctx context.Context) ([]*Movement, error)
    UpdateMovement(ctx context.Context, m *Movement) error
    DeleteMovement(ctx context.Context, id int) error
}
```
## 2025-05-28

I just had a chance to revisit the project after a ~3 month hiatus, and I'm not convinced I liked the direction. So, I'm (once again) nuking it and starting over. This probably isn't the most efficient approach, but you know, whatever.

To that end, I got a basic webserver up that can serve an index. Essentially a "hello, world" web server.
## 2025-03-04

I didn't have that long to work today, but I spent some time fixing the API endpoint naming (see below). I also consolidated some logic associated with getting all of the muscles associated with a movement into a method (see `movementService.GetMovementMuscles())`, which reduced some duplication in the code. And I wrote a couple of other methods for getting movements from the sqlite database. 

The next step is probably to write the `DeleteMovement` method, then start to take care of some more API endpoints. And from there I can branch out to start working on `Workout` stuff and finally get beyond just `Movement`.

Although I should probably write some tests and add logging before doing that?
## 2025-02-26

I spent a few minutes working today, and I wrote an API endpoint to get a movement by ID (`handleAPIGetMovementByID`). I want to write functionality to retrieve by name next, though, and I probably need to change how I'm defining paths in the API. Rather than having a request to get an API by ID go to the route `api/v1/movement/{id}`, I probably want it to go to `api/v1/movement/id/{id}`, which would allow me to route names via `api/v1/movement/name/{name}`. An alternative, though, would be to use query parameters, e.g. `api/v1/movement?id={id}` or something.

I think I prefer having different routes for each request type, but I want to think on it more.

Unrelated, but I think I might also want to add a `GetLatestWorkout` method?

I also want to add some logging soon, I think.
## 2025-02-24

Once again I took too much time off. Last week was weird with snow, but that's also an excuse.

It took a bit to shake off the rust, but I basically just wrote the `GetMovementByID` functionality this afternoon (see `sqlite/movement.go`). I haven't tested it out, yet, though, so that's the next step I guess.
## 2025-02-14 Update

I shouldn't have waited a whole week to work on this. Oops.

But, I figured out a solution to the issue of the dependency between the `MovementService` and `MuscleService` -- I injected the `MuscleService` interface into the `MovementService` struct. So the definition for a `movementService` in my `sqlite` package is now:

```go
type movementService struct {
    db  *sql.DB
    mus flexcreek.MuscleService
}

  

func NewMovementService(db *sql.DB, mus flexcreek.MuscleService) flexcreek.MovementService {
    return &movementService{
        db:  db,
        mus: mus,
    }
}
```

Which I think is a pretty tidy way to resolve this. It also presents me with a route forward when I start defining functionality for, like, a `WorkoutService`, because I'll need to inject `MovementService` as a dependency in there.

Now that I have all of that figured out, I then went through and defined a bunch of CRUD methods for the `MuscleService`. The next step is to define all of the methods for `MovementService`. When I do this, I also need to clean up existing methods to ensure they call appropriate methods from the injected `MuscleService` rather than writing ad-hod to the database.

Oh and then of course I need to write tests for both services.

## 2025-02-07 Update

So, I did a couple of things today.

First, I defined a helper function to handle creating a database used for testing (`sqlite/utils.go`).

Second, I scaffolded a `MuscleService` struct and interface. My thinking is that, like `MovementService` will have methods for adding movements to the database, `MuscleService` will define these methods for adding muscles. At first this seemed like a decent idea, but I think I might be adding a bit more complexity than I need to be adding. The more I think about it, I feel like a better approach might just be to define these as functions within the `sqlite` package, especially since the `MovementService` will need to access these functions, since muscles will be read/written by the `MovementService`.
## 2025-02-03 Update

I wrote a pretty basic test for writing a movement to the sqlite database. I need to expand on the test cases, here, moving forward.

I'm also realizing I don't have a create way to test writing muscles to the database (which get written along with movements), so I probably need to define a `MuscleService` as well. Otherwise, I'll be writing piecemeal SQL in multiple places when I need to handle muscle stuff
## 2025-01-31 Update

I finally got a handler set up for creating a movement (`handleApiCreateMovement`), and I did an ad-hoc test (aka I started the server and ran a POST request to that route), and it seemed to work.

The next step is to test the sqlite functionality, which I started doing in `sqlite/movement_test.go`. I have historically ignored testing my go code, so this might be slow-ish learning.
## 2025-01-27 Update

I didn't have very much time today to work, and I had to do some searching on how to handle writing a record given the database schema. But I think I have a reasonable approach for `CreateMovement` now. I haven't tested it yet, so writing a handler and checking the functionality will be the next step.

to do:
- Use `modernc.org/sqlite` driver instead of `mattn/go-sqlite3` bc the former doesn't require gcc.
## 2025-01-22 Update

I spent some time today working on a `MovementService` to write movements to the sqlite database. I'm still mostly just scaffolding, although I did *start* to write some of the functionality to create a new movement. I'll need to pick back up here next time. I think once I get the `CreateMovement` functionality done, I'll add a handler so I can check the functionality. 

And I should probably also write a test at that point...
## 2025-01-16 Update

It's been too long since I've worked on this, and I didn't even have all that much time today. I spent a bit of time remembering where I was (which wasn't all that far in), and doing some scaffolding. I set up a few skeleton routes in `server/server.go` to get and create movements, with both API and HTML endpoints. The next step is probably to implement a service that interacts with the db so that I can actually implement the logic and have these routes do something.

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