# FAQ

## Is this a serious distro?

It's a hobby project by one person — but yes, it's daily-drivable. Under the pink paint it's completely normal Debian 13 (trixie), so anything that works on Debian works here.

## What are the system requirements?

Anything that runs Debian with XFCE comfortably: a 64-bit (amd64) CPU, ~2 GB RAM (4+ recommended), ~20 GB disk. Boots on both UEFI and legacy BIOS.

## How do updates work?

`boykisser update` — it takes a Timeshift snapshot first, then updates apt and Flatpak. Regular `sudo apt upgrade` works too, of course. Security updates come straight from Debian.

## Something broke. Where do I report it?

[GitHub issues](https://github.com/taynotfound/BoykisserLinux/issues), please. Run `boykisser report` first — it collects the system info that makes bugs actually fixable.

## Can I roll back a bad update?

Yes — Timeshift snapshots are set up out of the box, and `boykisser update` snapshots before touching anything. Open Timeshift and restore.

## Can I use KDE instead of XFCE?

Yep — pick **KDE Plasma** in the installer and it gets the same pink theming.

## Does it phone home / have telemetry?

No. It's Debian plus theming and helper scripts. Nothing is collected.

## Can I remove the pink?

You *can* (`boykisser theme` flips light/dark, and standard XFCE/KDE settings do the rest) — but then why are you here :3

## Where does the mascot come from?

Boykisser is a community meme character. This project is unofficial fan work, made with love.
