---
title: Google Compute Engine
draft: false
date: 2025-05-27
tags:
  - cloud/gcp
---
[Google Compute Engine (GCE)](https://cloud.google.com/products/compute) is a service from [[Google Cloud (GCP)]] that allows users to create and run virtual machines (VMs) on Google Cloud. GCE is essentially an Infrastructure as a Service (IaaS) product.

VMs can range in size and what they are optimized for. See [this table crosswalking VM types with various workloads](https://cloud.google.com/products/compute#choose-the-right-vm-for-your-workload-and-requirements) When creating toy applications, I've used the [e2](https://cloud.google.com/compute/docs/general-purpose-machines#e2_machine_types) machine types. Users can use pre-defined machines or they can create more customized machines, depending on their use cases.

One of the main benefits of GCE is that Google manages the hardware and the networking, so users only have to worry about the software, operating systems, and applications running on the VMs.

VMs manage on GCE also integrate easily with other Google services, and the `gcloud` CLI tool provides utilities for interacting with provisioned VMs.
