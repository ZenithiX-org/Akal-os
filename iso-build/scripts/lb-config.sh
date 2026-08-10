#!/bin/bash
# scripts/lb-config.sh — initializes the live-build configuration
# Run this ONCE before the first build (or after cleaning).
#
# This sets up the live-build tree with:
#   - Debian 12 (Bookworm) base
#   - amd64 architecture
#   - Hybrid ISO (BIOS + UEFI bootable)
#   - GRUB bootloader with Akal OS branding
#   - The chroot package list + hook from config/

set -e

cd "$(dirname "$0")/.."

echo "=== Akal OS: running lb config ==="

# Clean any previous build state
lb clean noconfig || true

# Configure the build
#   --distribution bookworm     → Debian 12 (stable, well-supported)
#   --architecture amd64        → 64-bit PC
#   --binary-images iso-hybrid  → bootable on BIOS + UEFI
#   --bootloader grub            → GRUB bootloader
#   --debian-installer live     → includes the Debian installer (optional)
#   --iso-volume "Akal OS 1.0"  → ISO volume label
lb config \
    --distribution bookworm \
    --architecture amd64 \
    --binary-images iso-hybrid \
    --bootloader grub \
    --debian-installer live \
    --debian-installer-distribution bookworm \
    --iso-volume "Akal OS 1.0" \
    --iso-publisher "Akal OS Project" \
    --iso-application "Akal OS 1.0 Live System" \
    --memtest 1 \
    --updates true \
    --security true \
    --parent-mirror-bootstrap http://deb.debian.org/debian/ \
    --parent-mirror-chroot http://deb.debian.org/debian/ \
    --parent-mirror-binary http://deb.debian.org/debian/ \
    --mirror-bootstrap http://deb.debian.org/debian/ \
    --mirror-chroot http://deb.debian.org/debian/ \
    --mirror-binary http://deb.debian.org/debian/

echo "=== lb config complete ==="
echo ""
echo "Next steps:"
echo "  1. Run ./scripts/prepare-web-app.sh  (builds the Next.js app + copies into chroot)"
echo "  2. Run ./scripts/produce-iso.sh      (runs lb build → produces the .iso)"
