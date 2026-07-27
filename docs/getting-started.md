# Getting started

Welcome to Boykisser Linux :3 — a pink Debian 13 (trixie) spin with a fully themed XFCE desktop.

## Grab an ISO

There are two flavours on the [releases page](https://github.com/taynotfound/BoykisserLinux/releases/latest):

- **Full ISO** — everything preinstalled, works offline. The one to pick if you're not sure.
- **Netinstall ISO** — much smaller download, pulls packages from the internet during install.

## Write it to a USB stick

Any of the usual tools work:

```bash
# Linux / macOS — replace sdX with your stick, this ERASES it!
sudo dd if=boykisser-linux-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

On Windows, use [Rufus](https://rufus.ie/) or [balenaEtcher](https://etcher.balena.io/) — pick "DD mode" if Rufus asks.

## Boot it

Boot from the stick (usually F12 / F11 / Esc for the boot menu). Both UEFI and legacy BIOS work. The boot menu also has a **language submenu** if you want the live session in German, French, Spanish, Italian, Portuguese, Polish or Dutch.

The live session logs in automatically. A welcome screen greets you with a little checklist of things to try — including installing to disk when you're ready.

## First things to poke at

- **Boykisser Center** — the pink control panel in the menu. One place for updates, themes, presets and more.
- `boykisser welcome` — the welcome checklist, any time.
- `boykisser doctor` — a quick health check of the system.
