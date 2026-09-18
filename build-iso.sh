#!/bin/bash
# build-iso.sh — top-level orchestrator. Run on a Linux build machine.
#
# Usage:
#   ./build-iso.sh          # full build (install deps + config + build + iso)
#   ./build-iso.sh --quick  # skip dep install (assumes live-build already installed)
#
# This script is idempotent — you can re-run it after fixing code and it will
# rebuild the web app + ISO.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ISO_DIR="$SCRIPT_DIR/iso-build"

QUICK=0
if [ "$1" = "--quick" ]; then
    QUICK=1
fi

echo "╔══════════════════════════════════════════════════════╗"
echo "║          Akal OS — Live ISO Builder                  ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# --- 1. Install deps ---
if [ "$QUICK" -eq 0 ]; then
    echo "▶ Step 1/5: Installing build dependencies..."
    "$ISO_DIR/scripts/install-build-deps.sh"
else
    echo "▶ Step 1/5: Skipping dep install (--quick)"
fi

# --- 2. lb config ---
echo ""
echo "▶ Step 2/5: Initializing live-build tree..."
"$ISO_DIR/scripts/lb-config.sh"

# --- 3. Generate assets ---
echo ""
echo "▶ Step 3/5: Generating boot assets (GRUB bg, Plymouth logo)..."
"$ISO_DIR/scripts/generate-assets.sh"

# --- 4. Prepare web app ---
echo ""
echo "▶ Step 4/5: Building Next.js app + copying into chroot..."
"$ISO_DIR/scripts/prepare-web-app.sh"

# --- 5. Build ISO ---
echo ""
echo "▶ Step 5/5: Building ISO (this takes 20-60 min)..."
"$ISO_DIR/scripts/produce-iso.sh"

# --- Done ---
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                    ✅ Done!                          ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "Your ISO is at:"
echo "  $ISO_DIR/live-image-amd64.hybrid.iso"
echo ""
ISO_SIZE=$(du -h "$ISO_DIR/live-image-amd64.hybrid.iso" 2>/dev/null | cut -f1 || echo "?")
echo "Size: $ISO_SIZE"
echo ""
echo "Test it with QEMU:"
echo "  qemu-system-x86_64 -m 4096 -smp 2 -cdrom $ISO_DIR/live-image-amd64.hybrid.iso -boot d"
echo ""
echo "Or burn to USB:"
echo "  sudo dd if=$ISO_DIR/live-image-amd64.hybrid.iso of=/dev/sdX bs=4M status=progress"
