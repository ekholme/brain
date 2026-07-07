---
title: Agent Skills
draft: false
date: 2026-07-07
tags:
  - ai/agents
---
An Agent Skill is a higher-level, goal-oriented capability that can be given to [[AI Agents]]. Agent Skills typically combine prompt engineering, logic, and potentially multiple tools to autonomously solve a complex task. Skills will typically define *how* and *when* to use various tools to solve a problem. As an analogy, tools might be a hammer, measuring tape, and a saw, whereas a skill might be "Carpentry," and the carpentry skill might entail knowing how to use these tools to build a table.

Well-defined skills will also include logic for what an agent should do if an action fails. They also must manage short-term memory and long-term memory.
## Example

A more apt example might be the [Omarchy Skill](https://github.com/robzolkos/omarchy-skill/tree/master). This provides agents with a skill to help users manage and customize their [[Omarchy]] distros. If we have an agent running on our Omarchy machine, we can ask it to perform some action (e.g. "Change my terminal font" or "Develop a new theme using the Virginia Tech color palette."). Our agent will recognize that we're asking it to do something that involving Omarchy, then it will evaluate our prompt against its list of *Skill Definitions*, which are populated using metadata from each skill (via the `description` field in each skill's `SKILL.md` file). The agent then "routes" the conversation to that specific skill. This skill will give the agent access to the Omarchy manual, provide instructions for how to respond to user queries (e.g. "ALWAYS fetch the relevant manual page BEFORE answering..."), and describe a workflow the agent should undertake when editing files.

## Creating Agent Skills

Anyone can create Agent Skills. There is a standardized way to create skills as described on [Agentskills.io](https://agentskills.io/home). Most of what needs to be included in a skill can be included in a `SKILL.md` file, although in some cases it may be worthwhile to include scripts, templates, reference materials, or other documents as well. A directory defining a skill might look like this:

```
my-skill/
├── README.md         # Optional, but should be included
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

### SKILL.md
The `SKILL.md` file is at the heart of defining an agent skill. This file contains YAML frontmatter followed by Markdown content. The YAML frontmatter fields can be:

| Field           | Required | Constraints                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`          | Yes      | Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen.             |
| `description`   | Yes      | Max 1024 characters. Non-empty. Describes what the skill does and when to use it.                                 |
| `license`       | No       | License name or reference to a bundled license file.                                                              |
| `compatibility` | No       | Max 500 characters. Indicates environment requirements (intended product, system packages, network access, etc.). |
| `metadata`      | No       | Arbitrary key-value mapping for additional metadata.                                                              |
| `allowed-tools` | No       | Space-separated string of pre-approved tools the skill may use. (Experimental)                                    |