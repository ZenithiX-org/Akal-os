#!/bin/bash
# scripts/generate-assets.sh — generates GRUB background + Plymouth logo PNGs
# from the SVG logo. Requires ImageMagick (installed by install-build-deps.sh).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ISO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BRANDING="$ISO_ROOT/branding"
LOGO_SVG="$BRANDING/logos/logo.svg"

if [ ! -f "$LOGO_SVG" ]; then
    echo "ERROR: $LOGO_SVG not found"
    exit 1
fi

if ! command -v convert >/dev/null 2>&1; then
    echo "ERROR: ImageMagick 'convert' not found. Run install-build-deps.sh first."
    exit 1
fi

echo "=== Generating Akal OS image assets ==="

# --- 1. Plymouth logo (centered on transparent bg, 256x256) ---
echo ">> Plymouth logo..."
convert -background none -resize 256x256 "$LOGO_SVG" "$BRANDING/logos/logo.png"

# --- 2. GRUB background (1920x1080, dark with centered logo) ---
echo ">> GRUB background..."
convert -size 1920x1080 \
    -define gradient:angle=135 \
    gradient:'#1a0f2e-#0d0008' \
    -fill '#d70a53' -gravity center -draw 'circle 960,440 960,560' \
    -gravity center -resize 200x200 "$LOGO_SVG" -composite \
    -gravity south -pointsize 36 -fill '#ffffff' -annotate +0+60 'Akal OS 1.0' \
    "$BRANDING/grub/akal-grub.png"

# --- 3. Copy into chroot includes ---
mkdir -p "$ISO_ROOT/config/chroot/includes.chroot/usr/share/backgrounds"
mkdir -p "$ISO_ROOT/config/chroot/includes.chroot/usr/share/plymouth/themes/akal-os"
cp "$BRANDING/grub/akal-grub.png" \
   "$ISO_ROOT/config/chroot/includes.chroot/usr/share/backgrounds/akal-grub.png"
cp "$BRANDING/logos/logo.png" \
   "$ISO_ROOT/config/chroot/includes.chroot/usr/share/plymouth/themes/akal-os/logo.png"

echo ""
echo "=== Assets generated ==="
ls -lh "$BRANDING/grub/akal-grub.png" "$BRANDING/logos/logo.png"
