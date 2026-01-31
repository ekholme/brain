---
title: Pull Request
draft: false
date: 2025-10-29
tags:
  - programming/git
---
A [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (PR) is a proposal to merge a set of changes from one [[Git|git]] branch to another. They're helpful because they let contributors discuss the changes in a branch before merging them into another branch. They also show the differences (`diffs`) between the two branches so developers can easily see what will change.

## Internal Team PRs

Generally, the process looks something like this if you have **write access** to a Github repository:

### Phase 1: Local Development

1. Clone a repository (`git clone REPO`) if you don't already have it
2. Create a new branch (`git checkout -b my-feature-branch`)
3. Make changes and commits (`git add .` and `git commit -m "description of work"`)
4. Push your branch to the remote repository (`git push -u origin my-feature-branch`)

### Phase 2: Creating the Pull Request

5. Go to Github to propose the merge using the Github website UI (there's typically a prompt  on the page that will say something like **Compare & pull request** after pushing changes)
6. Set the base (the target branch, typically `master`) and the head (`my-feature-branch`)
7. Write a description
8. Assign reviewers (optional)
9. Click the **Create pull request** button

### Phase 3: Review and Merge

10. Reviewers will read code, test changes, and provide feedback.
11. Address feedback. On your local machine, address any feedback provided by reviewers by making changes *in the same branch*. When you make changes, commit and push as normal (`git commit -m "fix: address reviewer feedback on X"`, `git push`). *Note that pushing will automatically update the PR*
12. Run tests. Typically, a PR can't be merged unless the tests all pass.
13. Approve and merge
14. Clean up. Delete the remote feature branch and your local feature branch (e.g. `git branch -d my-feature-branch`)

## Open Source/External Contributor PRs

If we're making a PR to an open-source project where we don't have write access to the main project, the process is a little bit different.

Here's a breakdown of the two scenarios and where the crucial distinction lies:

---

#### 🤝 Two Collaboration Models

|**Feature**|**Direct Clone (Internal Team Model)**|**Fork & Clone (Open Source/External Contributor Model)**|
|---|---|---|
|**Why You Use It**|You already have **write access** to the main repository (e.g., you work on the core team).|You **do not have write access** to the main project and need a personal copy to push to (e.g., contributing to an open-source project).|
|**Phase 1: Local Push**|You push your new branch directly to the **main repository** (`git push origin feature/my-fix`).|You push your new branch to **_your personal fork_** (`git push origin feature/my-fix`).|
|**Phase 2: Creating the PR**|You open a PR _within the same repository_, comparing your branch (`feature/my-fix`) to `main`.|You open a PR from **_your fork's branch_** to the **_original repository's `main` branch_**.|
|**The Remote**|One remote repository.|Two remote repositories: **Origin** (your fork) and **Upstream** (the original project).|

#### The Critical Difference (Phase 2)

When you **fork and clone**, you are essentially submitting a pull request **across two different repositories**.

1. **Direct Clone PR:** You say, "Merge `repo-A/branch-B` into `repo-A/main`."
    
2. **Forked PR:** You say, "Merge `repo-B/branch-B` (your fork) into `repo-A/main` (the original project)."1
    

The web interface (GitHub, GitLab, etc.) recognizes that your repository is a fork, and when you click the "New Pull Request" button, it automatically prompts you to create a request _back to the original, upstream repository_.2

#### **Important Extra Step for Forking**

If you use the fork model, you will often need to do one extra step locally to keep your fork updated:

- **Add an Upstream Remote:** You need to point your local machine to the _original_ repository (called `upstream`) so you can pull in the latest changes that other contributors have merged.3
    
    Bash
    
    ```
    git remote add upstream [original-repository-url]
    git fetch upstream
    ```
    
    This allows you to frequently `git pull upstream main` to keep your fork synchronized before you start coding, ensuring you're working with the latest version.
    

So, while the **local development cycle** of creating a branch, committing, and pushing remains identical, the **push destination** and the **PR target** are the key distinctions. You're pushing to _your own_ remote copy (the fork) and then asking the maintainers of the _original_ remote copy to pull your changes in.