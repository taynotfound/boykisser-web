# Old hardware

Boykisser Linux runs fine on machines from ~2010 onwards. Here's what to know if your device is on the older side.

## Which ISO to grab

| Your machine | ISO |
|---|---|
| Modern — UEFI or BIOS, post-2012 | **Full** or **Netinstall** |
| Pre-2012 / ancient BIOS / Ventoy fails | **Lite** |

The **Lite ISO** is built with BIOS-only syslinux (no grub-efi hybrid) and `nomodeset` in the default boot line. This is what lets crusty firmware actually chainload past the boot menu instead of dropping to a `grub>` rescue prompt.

Grab it from the [latest release](https://github.com/taynotfound/BoykisserLinux/releases/latest) — file is `boykisser-linux-lite-amd64.iso`.

## Flashing it

```sh
# double-check /dev/sdX is your USB first
sudo dd if=boykisser-linux-lite-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

No Ventoy, no Rufus multiboot — just `dd` straight to the USB. Ventoy adds its own bootloader chain that old firmware can reject.

## BIOS settings

If it still won't boot after `dd`:

1. Enter BIOS/UEFI setup (usually F2, F12, or Del at POST).
2. Find **Boot Mode** or **Boot Type** — set it to **Legacy** or enable **CSM** (Compatibility Support Module).
3. Disable **Secure Boot** if present.
4. Save and reboot.

## Sandy Bridge (2nd gen Intel, ~2011)

Works. CSM is standard on those boards, and the i915 driver in Debian trixie handles Sandy Bridge natively. `nomodeset` in the lite ISO disables KMS (so no compositor hardware acceleration), but Xfce doesn't need it — everything runs fine.

## Last resort — install from another live environment

If the ISO genuinely won't boot no matter what, you can install Boykisser from inside any other live Linux (Ubuntu, Debian, whatever boots):

```sh
# 1. partition your target disk however you like (gparted or parted)
#    e.g. /dev/sda1 = ext4 mounted at /mnt, /dev/sda2 = swap

# 2. bootstrap the base system
sudo debootstrap trixie /mnt http://deb.debian.org/debian

# 3. chroot in
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys
sudo chroot /mnt

# 4. inside the chroot — install the desktop + bootloader
apt update
apt install task-xfce-desktop lightdm linux-image-amd64 firmware-linux grub-pc
grub-install /dev/sda
update-grub
passwd  # set root password

# 5. exit and reboot
exit
sudo umount -R /mnt
sudo reboot
```

This gives you a plain Debian trixie + Xfce base. From there, `apt install boykisser-meta` (once you've added our repo) layers the full Boykisser theming and tooling on top — or just use the plain desktop as-is.
