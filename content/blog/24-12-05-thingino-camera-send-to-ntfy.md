---
title: Getting Thingino webhooks to play nice with ntfy
description: A simple fix
date: 2024-12-05
tags:
  - Home automation
---

A quick fix for anyone else who's got a [Thingino](https://thingino.com/) firmware'd camera and wants to send notifications with screenshots to [ntfy](https://ntfy.sh/) via Thingino's 'webhook' option.

By default it won't work, because behind the scenes Thingingo calls `curl -F 'image=@$attachment'` and sends the image as form data. You will receive an `attachment.bin` file which won't open:

![A screenshot of the ntfy interface showing 'You received a file: attachment.bin'](/blog/img/2024-12-05-ntfy-screenshot-failure.png)

To play nicely with `ntfy` you need to change this to `-F` to a `-T` for "upload file". And while you're in there you might as well add a nice title and icon too:

![A screenshot of the ntfy interface showing 'Front door motion detected. You received a file: camera.jpg' and the actual photo itself](/blog/img/2024-12-05-ntfy-screenshot-success.png)

You'll need to:

- `ssh root@ip_address` to log into the camera, and
- `vi /usr/sbin/send2webhook` to edit the webhook code

Change [line 36](https://github.com/themactep/thingino-firmware/blob/master/overlay/lower/usr/sbin/send2webhook#L36) from `build_cmd "-F 'image=@$attachment'"` to something like:

```bash
build_cmd "-T '$attachment' -H 'Filename: camera.jpg'" -H 'Tag: camera_flash' -H 'Title: Front door motion detected'
```

Save and you're done. Easy!
