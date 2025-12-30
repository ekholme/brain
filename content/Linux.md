---
title: Linux
draft: false
date: 2025-12-17
tags:
  - linux
---
[Linux](https://en.wikipedia.org/wiki/Linux) is a family of free and open-source operating systems that serve as a contrast to proprietary operating systems such as Windows and MacOS.

It serves as a middleman between the computer's hardware and the software you run.

Technically, "linux" refers only to the kernel, although it's colloquially used to refer to the entire operating system.

## Architecture

The architecture of linux is like an onion, or a set of concentric circles. At the innermost layer is the **hardware**. The next layer is the **linux kernel**, which determines which applications can interact with the hardware, how they interact with the hardware, how to allocate resources, etc. The **kernel** is the only component that interacts directly with the hardware.

The next layer is the **shell**. This is a (text) interface that allows users to interact with the kernel via commands

The outermost layer consists of **applications** and other pieces of software.

## Distributions

Since Linux is open-source, different groups have created their own spins on Linux. These distributions (*distros*) prioritize different features and make various tradeoffs.

Some popular distros include:

### Ubuntu

Ubuntu is one of the most popular Linux distros. It's designed for accessibility and user-friendliness. It's a good choice for beginners to Linux.

One drawback of Ubuntu is the Snap package format, which some criticize as being too centralized.

### Debian

Debian is one of the oldest Linux distros, and it serves as the foundation for many other distros, including Ubuntu. Debian prioritizes extreme stability.

One of the tradeoffs for this stability is that it takes a long time to get the newest versions of apps/packages onto Debian -- sometimes months or even years.

### Arch
*see also [[Arch Linux]]*

Arch is a "DIY" operating system. It provides a bare minimum system by default and asks users to install additional packages as they need them.

In contrast to Debian, Arch prioritizes bleeding-edge software, and makes it easy to install the latest versions of everything. Arch itself uses a "rolling release" model, where you install it once and it continues to update forever.

Some downsides of Arch are the extensive (manual) configuration required and the relative ease with which you can break things on your system by updating packages.

### Fedora

Fedora offers something of a middle ground between Ubuntu and Arch. It's more up-to-date than Ubuntu (which tends to lean more toward prioritizing stability) and more stable than Arch.

One of the tradeoffs, though, is that Fedora has a short lifecycle, releasing a new major version every 6-12 months.

### Mint

Mint is based on Ubuntu and is designed to feel familiar to people coming from Windows. It typically includes everything you need (e.g. drivers) out of the box.


