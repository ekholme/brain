---
title: LaTeX
draft: false
date: 2025-04-16
tags:
  - latex/math
---
[LaTeX](https://www.latex-project.org/) is a typesetting system that excels at producing technical documents, including mathematical formulas, scientific notation, and structured content. Unlike something like Microsoft Word or Google Docs, LaTeX de-couples the design of the document from the content. Designs are created separately, and LaTeX documents are written in plain-text/markup commands that can be styled after the fact.

## Helpful LaTeX Snippets

Below are a handful of helpful snippets/concepts.

### Cases (Math)

If we want to write a formula that has "case" or "if" logic, we use a "cases" block, e.g.
$$
y = \begin{cases}
x^3 \text{ if } x>0 \\
0 \text{ otherwise}
\end{cases}
$$
The actual text that produces the above is:

> y = \begin{cases}
> x^3 \text{ if } x>0 \\
> 0 \text{ otherwise}
> \end{cases}

