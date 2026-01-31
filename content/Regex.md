---
title: Regex
draft: false
date: 2024-11-13
tags:
  - regex
---
 Regex is basically dark magic. Voodoo shit. It is short for **Reg**ular **Ex**pressions and is a paradigm for coding (e.g. finding, matching, subsetting) flexibly with strings.
 
 These are non-comprehensive notes addressing issues I commonly have with regex.

### Matching Digits

- To match a string with *n* digits: `\d{n}`
- To match between (inclusive!) *n* and *m* digits: `\d{n,m}`
- To match a string with one or more digits: `\d+`. Note that this *doesn't take brackets!*

