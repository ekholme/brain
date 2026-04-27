---
title: bubbletea
draft: false
date: 2026-04-16
tags:
  - programming/go
  - programming/tui
---
[bubbletea](https://github.com/charmbracelet/bubbletea) is a TUI framework designed for [[Go]] that is based on the [Elm Architecture](https://guide.elm-lang.org/architecture/). It helps users build stateful, interactive terminal applications.

Since bubbletea is a framework, there are several [components](https://github.com/charmbracelet/bubbles) available to help create things like text inputs, lists, etc.

## Architecture

bubbletea programs are based around the concept of a **model** that implements three methods:
- `Init()` -- a function that initializes the application (typically performing some initial IO)
- `Update()` -- a function that handles events and updates the model
- `View()` -- a function that renders the UI in the terminal.

bubbletea also has two other critical features: messages (`Msg`) and commands (`Cmd`). bubbletea communicates within the application using messages. If we need to pass data around, we do it in the form of a `Msg`. A `Msg` has the following signature:

`type Msg interface{}`, which means it can be anything.

A `Cmd` is a function that returns a `Msg`. If we need our application to run a function, we need to wrap it in a `Cmd`, since the bubbletea library ensures that `Cmd` don't block and generally integrate into the overall application flow. A `Cmd` has the following signature:

`type Cmd func() tea.Msg`

## Demo Application

I wrote a fairly basic [to-do list application](https://github.com/ekholme/bubbletea_demo/tree/master) that demonstrates how bubbletea works. Here's the code for it:

```go
// this is a basic to-do list bubbletea application
package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
	_ "modernc.org/sqlite"
)

const (
	dsn = "demo.db"
)

// defining db stuff
type todoService struct {
	db *sql.DB
}

func newTodoService(db *sql.DB) todoService {
	return todoService{
		db: db,
	}
}

func (td todoService) CreateItem(item string) (int, error) {
	ctx := context.Background()

	qry := `
	INSERT INTO items (item)
	VALUES (?)
	`

	res, err := td.db.ExecContext(ctx, qry, item)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (td todoService) GetAllItems() ([]string, error) {
	ctx := context.Background()

	qry := `
	SELECT item	
	FROM items
	`

	rows, err := td.db.QueryContext(ctx, qry)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var items []string

	for rows.Next() {
		var item string

		if err := rows.Scan(&item); err != nil {
			return nil, err
		}

		items = append(items, item)
	}

	return items, rows.Err()
}

// a message to represent that the initial items have been loaded
type itemsLoadedMsg []string

// a message to represent an error
type errMsg struct{ err error }

// a message to represent that an item has been created
type itemCreatedMsg struct{}

type model struct {
	todoList    []string
	todoService todoService
	input       textinput.Model
	err         error
}

// constructor for the initial model state
func initialModel(db *sql.DB) model {
	svc := newTodoService(db)
	ti := textinput.New()
	ti.Placeholder = "What needs to be done?"

	//ti.Focus() is a tea.Cmd that sets the focus state on the ti.Model(), which allows for keyboard input
	ti.Focus()
	return model{
		todoList:    []string{},
		todoService: svc,
		input:       ti,
	}
}

// loadItems is a tea.Cmd that retrieves all items from the database
func (m model) loadItems() tea.Msg {
	items, err := m.todoService.GetAllItems()
	if err != nil {
		return errMsg{err}
	}
	return itemsLoadedMsg(items)
}

func (m model) Init() tea.Cmd {
	// When the application starts, we want to load the to-do items.
	return m.loadItems
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd

	switch msg := msg.(type) {
	case tea.KeyMsg:
		// Handle key presses
		switch msg.String() {
		case "ctrl+c", "esc":
			return m, tea.Quit

		case "enter":
			if m.input.Value() != "" {
				item := m.input.Value()
				m.input.Reset() // Clear the input field immediately

				// Return a command to create the item in the database
				return m, func() tea.Msg {
					if _, err := m.todoService.CreateItem(item); err != nil {
						return errMsg{err}
					}
					// On success, we'll send a message to trigger a reload of the list
					return itemCreatedMsg{}
				}
			}
		}

	// Handle the message that our initial items have been loaded
	case itemsLoadedMsg:
		m.todoList = msg

	// Handle the message that a new item has been created
	case itemCreatedMsg:
		// We've successfully created an item, now reload the list from the DB
		return m, m.loadItems

	case errMsg:
		m.err = msg.err
		return m, nil
	}

	//update the input (handling typing/blinking)
	m.input, cmd = m.input.Update(msg)
	return m, cmd

}

func (m model) View() string {
	if m.err != nil {
		return fmt.Sprintf("Error: %v", m.err)
	}

	s := "--- My ToDo List ---\n\n"

	for _, item := range m.todoList {
		s += fmt.Sprintf("- %s\n", item)
	}

	// Render the text input and help text
	s += fmt.Sprintf("\n%s\n\n", m.input.View())
	s += "(esc to quit)"

	return s
}

func main() {
	db, err := sql.Open("sqlite", dsn)

	if err != nil {
		fmt.Printf("Error connecting to db: %v", err)
		os.Exit(1)
	}

	defer db.Close()

	p := tea.NewProgram(initialModel(db))

	if _, err := p.Run(); err != nil {
		fmt.Printf("Error: %v", err)
		os.Exit(1)
	}
}
```