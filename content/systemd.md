---
title: systemd
draft: false
date: 2026-05-19
tags:
  - linux
  - programming/cli
---
[systemd](https://en.wikipedia.org/wiki/Systemd) is a service manager for [[Linux]] computers. Its job is to manage all of the other services running on the system at a given time. It's the first service that runs when the computer is booted, and it initializes (and manages) all of the other components of the system while the computer is running.

When we want to manage services from the command line, we'll typically use the `systemctl` tool, which provides us with a way to start, stop, or check the status of a service, e.g.:

`sudo systemctl start <service_name>`
`sudo systemctl stop <service_name>`
`systemctl status <service_name>`

We can also view logs using the `journalctl` tool, e.g.:

`journalctl -u <service_name>`

## Configuring Services

We can configure how services run on a machine by creating and editing `.service` files. Imagine we have a service named `daren` and we want to configure it running with systemd. We could do this by editing a service file, e.g.:

`sudo nvim /etc/systemd/system/daren.service`

We might include the following in this service file:
```toml
[Unit]
Description=Daren Go Web Server
After=network.target

[Service]
Type=simple
User=USERNAME
WorkingDirectory=/home/USERNAME/daren
ExecStart=/home/USERNAME/daren/daren
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

The `[Unit]` section includes metadata, including a description of the service and an instruction not to start the service until after the network is up and running (since this is a web app, it needs a network connection).

The `[Service]` section defines the data that systemd needs to run the service:
- I'm not 100% sure what `Type = simple` means, but I think it's that the application started by `ExecStart` is basically the whole application?
- `User = USERNAME` is a security feature that runs the application with user permissions rather than with root permissions.
- `WorkingDirectory` and `ExecStart` specify the working directory and the executable to be run, respectively.
- `Restart` and `RestartSec` tells systemd to restart the app if it crashes, but to wait 5 seconds before doing so.

Finally, the `[Install]` section describes how the service should be activated. Again, I'm not 100% sure about what's happening here, but my understanding is that `WantedBy=multi-user.target` basically means to run the app when the computer boots up normally.