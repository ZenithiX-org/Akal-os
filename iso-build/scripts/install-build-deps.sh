#!/bin/bash
# scripts/install-build-deps.sh — installs live-build & build tools on the host
# Run this ONCE on your Linux build machine (Debian/Ubuntu).

set -e

echo "=== Installing build dependencies ==="

if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update
    sudo apt-get install -y \
        live-build \
        debian-archive-keyring \
        debootstrap \
        squashfs-tools \
        genisoimage \
        xorriso \
        grub-pc-bin \
        grub-efi-amd64-bin \
        mtools \
        imagemagick \
        nodejs \
        npm
elif command -v dnf >/dev/null 2>&1; then
    sudo dnf install -y live-tools debootstrap squashfs-tools xorriso grub2-tools mtools ImageMagick nodejs npm
elif command -v pacman >/dev/null 2>&1; then
    sudo pacman -S --needed live-tools debootstrap squashfs-tools xorriso grub mtools imagemagick nodejs npm
else
    echo "Unsupported package manager. Install 'live-build' manually."
    exit 1
fi

echo ""
echo "=== Build dependencies installed ==="
echo ""
echo "live-build version: $(lb --version 2>/dev/null || echo 'not found')"
echo ""
echo "Next: run ./scripts/lb-config.sh to initialize the build tree."
