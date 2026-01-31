---
title: Pushing to Multiple Git Remotes
draft: false
date: 2024-12-11
tags:
  - programming/git
---
There are cases where we might have one local git repository that we want to connect to multiple remote repositories. For instance, I might have a remote repository on Google Cloud Source Repositories and one on Github. If I want to update both with a single push (to keep them in sync), I can do the following.

```bash
git remote set-url --add --push [remote_name] [url1]
git remote set-url --add --push [remote_name] [url2]
```

I probably want `[remote_name]` in the above command to be `origin`, but possibly there are cases where it can be something else.

Then I can push with the usual

```bash
git push [remote_name] [branch_name]
```

And if I ever need to delete one of the remotes, I can do the following:

```bash
git remote set-url --delete --push [remote_name] [url]
```