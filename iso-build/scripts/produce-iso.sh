#!/bin/bash
# scripts/produce-iso.sh — runs `lb build` to produce the bootable .iso
# Run this AFTER lb-config.sh AND prepare-web-app.sh.
#
# This takes ~20-60 minutes on the first run (downloads ~2GB of packages).
# Subsequent builds are faster if you don't `lb clean` between them.

set -e

cd "$(dirname "$0")/.."

echo "=== Akal OS: building ISO ==="
echo "This will take a while (20-60 min on first run)..."
echo ""

# Run the build as root (lb build requires root for chroot operations)
if [ "$(id -u)" -ne 0 ]; then
    echo "live-build requires root. Re-running with sudo..."
    exec sudo lb build
else
    exec lb build
fi
