# Akal OS — Bootable Live ISO Build

Turn the Akal OS web desktop into a **real bootable Linux ISO** you can run in VirtualBox, VMware, or burn to a USB stick.

This directory contains a complete [live-build](https://live-team.pages.debian.net/live-manual/html/live-manual.en.html) project that produces a Debian 12 (Bookworm) based live ISO with the Akal OS web desktop running as a kiosk session.

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                   Akal OS Live ISO                       │
│                                                         │
│  GRUB boot menu                                         │
│    └─> Linux kernel 6.1 (Debian bookworm)               │
│          └─> systemd                                    │
│              ├─> akal-web.service                        │
│              │     └─> Node.js + Next.js standalone      │
│              │           (serves http://127.0.0.1:3000)  │
│              └─> lightdm (auto-login)                    │
│                    └─> .xsession                         │
│                          ├─> openbox (window manager)    │
│                          └─> chromium --kiosk            │
│                                → http://127.0.0.1:3000   │
└─────────────────────────────────────────────────────────┘
```

The result: you boot the ISO → see the Akal OS boot splash → land directly in the Akal OS desktop (Chromium in fullscreen kiosk mode showing the web app). It **looks and feels like a real OS** — shut down / restart from the menu bar actually powers off the VM.

---

## Prerequisites

### Build host requirements

- **A Linux machine** (Debian 11+, Ubuntu 20.04+, or any distro with `live-build`)
  - ⚠️ **Not a Docker container** — live-build uses chroot and needs real kernel features
  - A VM (VirtualBox/VMware) running Linux works perfectly
- **~10 GB free disk space**
- **Internet access** (downloads ~2 GB of Debian packages on first build)
- **Root/sudo access** (live-build requires root for chroot operations)
- **8 GB RAM recommended** (the build is memory-intensive)

### To run the resulting ISO

- **VirtualBox** (free), **VMware**, **QEMU**, or a real PC
- Minimum **2 GB RAM, 1 CPU, 32 MB video RAM** (4 GB RAM recommended for smooth Chromium)
- **64-bit** (amd64) — the ISO supports both BIOS and UEFI boot

---

## Quick Start (3 commands)

```bash
# 1. Install build dependencies (one-time)
cd iso-build
./scripts/install-build-deps.sh

# 2. Initialize the live-build tree + generate image assets + build the web app
./scripts/lb-config.sh
./scripts/generate-assets.sh
./scripts/prepare-web-app.sh

# 3. Build the ISO (20-60 min on first run)
sudo ./scripts/produce-iso.sh
```

When it finishes, the ISO is at:

```
iso-build/live-image-amd64.hybrid.iso
```

(~1.2 GB — burn it to a USB with `dd` or `Rufus`, or attach it to a VM)

---

## Step-by-Step Guide

### Step 0: Get a Linux build machine (if you don't have one)

If you're on Windows/Mac, the easiest way is to spin up a free Linux VM:

- **Option A — Local VM:** Install [VirtualBox](https://www.virtualbox.org/), download a [Debian 12 netinst ISO](https://www.debian.org/CD/netinst/), install Debian in a VM (minimal install, no desktop needed — give it 30 GB disk + 4 GB RAM).
- **Option B — Cloud VM:** A free-tier VPS works but may lack nested virtualization for testing. [GitHub Codespaces](https://github.com/features/codespaces) or a [DigitalOcean droplet](https://digitalocean.com) (Debian, 4 GB RAM, 50 GB disk) works for building.

### Step 1: Copy this project to your Linux machine

```bash
# Option A: clone / scp the whole akal-os project over
scp -r akal-os/ user@your-linux-box:~/

# Option B: copy just the iso-build/ folder + the Next.js source
# (you need the full project so prepare-web-app.sh can build the web app)
```

### Step 2: Install build dependencies

```bash
cd ~/akal-os/iso-build
./scripts/install-build-deps.sh
```

This installs: `live-build`, `debootstrap`, `squashfs-tools`, `xorriso`, `grub-pc-bin`, `grub-efi-amd64-bin`, `imagemagick`, `nodejs`, `npm`.

### Step 3: Initialize the live-build tree

```bash
./scripts/lb-config.sh
```

This runs `lb config` with Debian Bookworm, amd64, hybrid ISO (BIOS+UEFI), GRUB bootloader, and Akal OS branding.

### Step 4: Generate boot assets (GRUB background, Plymouth logo)

```bash
./scripts/generate-assets.sh
```

This converts the Akal OS SVG logo into PNGs for the GRUB menu and Plymouth boot splash using ImageMagick.

### Step 5: Build the web app and copy it into the chroot

```bash
./scripts/prepare-web-app.sh
```

This runs `next build` (standalone output) and copies the production bundle into `config/chroot/includes.chroot/usr/share/akal-os/`. It also copies the kiosk service files.

### Step 6: Build the ISO

```bash
sudo ./scripts/produce-iso.sh
```

This runs `lb build`. **First run takes 20-60 minutes** (it downloads the full Debian archive + packages the squashfs). Subsequent builds are faster if you don't `lb clean`.

When it finishes, you'll see:

```
P: Binary stage completed.
P: Build completed successfully.
```

### Step 7: Test the ISO

```bash
# Option A: QEMU (fastest, no VirtualBox needed)
sudo apt install qemu-system-x86
qemu-system-x86_64 -m 4096 -smp 2 -cdrom live-image-amd64.hybrid.iso -boot d

# Option B: VirtualBox
# Create a new VM (Linux 64-bit, 4 GB RAM, 32 MB video)
# Settings → Storage → Attach the ISO to the optical drive
# Boot it

# Option C: Burn to USB
sudo dd if=live-image-amd64.hybrid.iso of=/dev/sdX bs=4M status=progress
# (replace /dev/sdX with your USB device — find it with `lsblk`)
```

---

## What You'll See

1. **GRUB menu** — "Akal OS 1.0 (Live)" with the Debian-swirl-style background
2. **Plymouth splash** — Akal OS logo + spinning ring + progress bar
3. **Auto-login** — lands directly in the Akal OS desktop (no login screen)
4. **Akal OS desktop** — the full macOS-style glassmorphism desktop, fullscreen
5. **Working power controls** — click the Apple logo → Shut Down / Restart / Sleep actually powers off the VM

---

## Customization

### Change the wallpaper

The default wallpaper is set in `src/lib/os-store.ts` (`WALLPAPERS` array). Re-run `prepare-web-app.sh` then `produce-iso.sh` to rebuild.

### Change the boot splash logo

Edit `branding/logos/logo.svg`, then re-run `generate-assets.sh` + `produce-iso.sh`.

### Add packages to the ISO

Edit `config/chroot/packages/akal-os.list.chroot` (one package per line), then re-run `produce-iso.sh`.

### Change the GRUB menu

Edit `config/binary/grub.cfg`, then re-run `produce-iso.sh`.

### Pre-install apps / files into the live system

Put files in `config/chroot/includes.chroot/` mirroring the filesystem. e.g. a file at `config/chroot/includes.chroot/opt/myapp/` ends up at `/opt/myapp/` in the live ISO.

---

## Install to Disk (optional)

The ISO includes the Debian installer. Boot the ISO, choose "Akal OS 1.0 (Install to disk)" in the GRUB menu, and follow the installer to install Akal OS to a real hard drive.

---

## Troubleshooting

### `lb build` fails with "debootstrap failed"

- Check your internet connection
- Run `sudo lb clean --purge` then `./scripts/lb-config.sh` then `sudo ./scripts/produce-iso.sh`
- On some systems, the Debian keyring is missing: `sudo apt install debian-archive-keyring`

### The ISO boots to a black screen

- Try the "Safe Graphics" GRUB option (uses `nomodeset`)
- In VirtualBox, ensure 3D acceleration is **off** for the first boot (Settings → Display)
- Increase video memory to 64 MB+

### Chromium doesn't launch / shows blank screen

- Switch to a TTY (Ctrl+Alt+F2) and log in as `akal` (no password)
- Check logs: `journalctl -u akal-web.service -u akal-kiosk.service`
- Manually test the web server: `curl http://127.0.0.1:3000/`

### Build runs out of disk space

- live-build caches packages in `cache/` — `sudo lb clean --purge` to clear everything
- The `.build/` directory inside `iso-build/` can be huge — safe to delete if build fails

### The web app didn't update after I changed code

- Re-run `./scripts/prepare-web-app.sh` (it rebuilds Next.js and recopies into chroot)
- Then `sudo ./scripts/produce-iso.sh` (lb build will detect the changed chroot includes)

---

## File Structure

```
iso-build/
├── README.md                          ← you are here
├── scripts/
│   ├── install-build-deps.sh          ← installs live-build + tools
│   ├── lb-config.sh                   ← initializes live-build tree
│   ├── generate-assets.sh             ← SVG → PNG (GRUB bg, Plymouth logo)
│   ├── prepare-web-app.sh             ← builds Next.js + copies into chroot
│   └── produce-iso.sh                 ← runs lb build → produces .iso
├── akal-kiosk/                         ← kiosk runtime source files
│   ├── akal-start-web                 ← starts Node server
│   ├── akal-start-kiosk               ← starts Chromium kiosk
│   ├── akal-web.service               ← systemd: Node server
│   ├── akal-kiosk.service             ← systemd: kiosk session
│   ├── lightdm.conf                   ← auto-login config
│   ├── xsession                       ← ~/.xsession (openbox + chromium)
│   └── akal.desktop                   ← session desktop entry
├── branding/
│   ├── logos/logo.svg                 ← Akal OS logo (SVG)
│   ├── grub/                          ← (generated) GRUB background PNG
│   └── plymouth/
│       ├── akal-os.plymouth           ← Plymouth theme manifest
│       └── akal-os.script             ← Plymouth splash script
└── config/                             ← live-build config tree
    ├── chroot/
    │   ├── packages/akal-os.list.chroot   ← packages to install
    │   └── includes.chroot/               ← files to overlay into the chroot
    │       └── usr/share/akal-os/         ← (the built web app goes here)
    ├── common/hooks/01-akal.hook.chroot   ← post-install customization
    └── binary/grub.cfg                    ← GRUB boot menu config
```

---

## Technical Details

### Why Debian Bookworm?

- Stable, well-supported by live-build
- Huge package repository (Node.js, Chromium, Plymouth, fonts all available)
- The Debian Swirl wallpaper matches our branding color (`#d70a53`)

### Why a kiosk instead of a full desktop?

A kiosk gives the **real OS feel** — you boot directly into Akal OS, no other desktop in the way. The alternative (installing GNOME + running Akal OS as a window) would feel like "a web app running on Linux," not "a real OS."

### How does the power-off actually work?

1. You click **Shut Down** in the Akal OS menu bar
2. The Next.js app calls `POST /api/power?action=shutdown`
3. The API (running as the `akal` user) calls `systemctl poweroff`
4. A sudoers rule (`/etc/sudoers.d/akal-power`) allows `akal` to run that command passwordlessly
5. The system powers off

### How big is the final ISO?

~1.2 GB. The breakdown:
- Debian base: ~250 MB
- Chromium: ~250 MB
- Node.js: ~80 MB
- Linux kernel + initramfs: ~80 MB
- Our Next.js app: ~60 MB
- Fonts (incl. Gurmukhi + emoji + CJK): ~400 MB
- Plymouth + GRUB + squashfs overhead: ~80 MB

---

## License

The Akal OS web app is MIT-licensed. The Debian base follows the [Debian Free Software Guidelines](https://www.debian.org/social_contract#guidelines).

---

**Built with ❤️ in Punjab.** Boot it, play with it, make it yours.
