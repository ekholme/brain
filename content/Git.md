---
title: Git
draft: false
date: 2025-04-30
tags:
  - git
---
[Git](https://git-scm.com/) is a free and open-source version control system. It facilitates collaborative work on software projects.

Beyond helping people collaborate on software development, git via [Github](https://github.com/) is also now kind of a networking, professional development, and project visibility tool in that people can use public repositories as artifacts representing proficiencies.

Git (and Github) also enable continuous integration/continuous development (CI/CD) workflows, which basically means that software (e.g. websites, applications) can be continuously tested, built, and deployed from git repositories through the use of tools like [Github Actions](https://github.com/features/actions).

## Fundamental Concepts

**Repositories** are kind of the foundational unit in git. They basically refer to the whole project itself.

**Branches** are kind of like independent timelines that track changes across files. A project will have a `main` (or `master`) branch that is the central timeline/path through the project, but there will often be other branches that diverge from this main timeline at a given point. By creating a new branch, a developer can ensure that any changes they make to this new branch won't affect the `master` branch until they choose to merge the new branch back into the master branch. See the image below for a representation of this:

![](https://gitbookdown.dallasdatascience.com/img/git_branch_merge.png)


## Readings

- [Happy Git... by Jenny Bryan](https://happygitwithr.com/)
- [Excuse me, do you have a moment to talk about version control? by Jenny Bryan](https://peerj.com/preprints/3159v2/)