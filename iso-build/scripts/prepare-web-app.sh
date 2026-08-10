#!/bin/bash
# scripts/prepare-web-app.sh — builds the Akal OS Next.js app and copies the
# standalone production bundle into the live-build chroot tree.
#
# Run this AFTER lb-config.sh, BEFORE produce-iso.sh.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ISO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CHROOT_APP="$ISO_ROOT/config/chroot/includes.chroot/usr/share/akal-os"
KIOSK_SRC="$ISO_ROOT/akal-kiosk"

echo "=== Akal OS: preparing web application ==="
echo "Project root: $PROJECT_ROOT"
echo "ISO root:     $ISO_ROOT"
echo ""

# --- 1. Build the Next.js app (standalone output) ---
echo ">> Building Next.js standalone bundle..."
cd "$PROJECT_ROOT"
# Use npm if bun isn't available on the build host
if command -v bun >/dev/null 2>&1; then
    bun run build
elif command -v npm >/dev/null 2>&1; then
    npm run build
else
    echo "ERROR: Neither bun nor npm found. Install one first."
    exit 1
fi

# --- 2. Verify the standalone build exists ---
if [ ! -d ".next/standalone" ]; then
    echo "ERROR: .next/standalone not found. Is 'output: standalone' set in next.config.ts?"
    exit 1
fi

# --- 3. Clear & recreate the chroot app directory ---
echo ">> Copying app into chroot..."
rm -rf "$CHROOT_APP"
mkdir -p "$CHROOT_APP"

# Copy the standalone Node server + package metadata
cp -a .next/standalone/. "$CHROOT_APP/"

# Copy static assets (Next.js doesn't bundle these in standalone by default)
mkdir -p "$CHROOT_APP/.next/static"
cp -a .next/static/. "$CHROOT_APP/.next/static/"

# Copy the public folder (logo, etc.)
if [ -d "public" ]; then
    cp -a public "$CHROOT_APP/public"
fi

# --- 4. Copy kiosk runtime files (services, scripts, xsession) ---
echo ">> Copying kiosk runtime files..."
mkdir -p "$CHROOT_APP/bin"
cp "$KIOSK_SRC/akal-start-web"   "$CHROOT_APP/bin/akal-start-web"
cp "$KIOSK_SRC/akal-start-kiosk" "$CHROOT_APP/bin/akal-start-kiosk"
cp "$KIOSK_SRC/akal-web.service" "$CHROOT_APP/bin/akal-web.service"
cp "$KIOSK_SRC/akal-kiosk.service" "$CHROOT_APP/bin/akal-kiosk.service"
cp "$KIOSK_SRC/lightdm.conf"     "$CHROOT_APP/bin/lightdm.conf"
cp "$KIOSK_SRC/xsession"         "$CHROOT_APP/bin/xsession"
cp "$KIOSK_SRC/akal.desktop"     "$CHROOT_APP/bin/akal.desktop"
chmod +x "$CHROOT_APP/bin/akal-start-web" "$CHROOT_APP/bin/akal-start-kiosk" "$CHROOT_APP/bin/xsession"

# --- 5. Copy branding (GRUB background, Plymouth logo) ---
echo ">> Copying branding..."
cp "$ISO_ROOT/branding/grub/akal-grub.png" \
   "$ISO_ROOT/config/chroot/includes.chroot/usr/share/backgrounds/akal-grub.png" 2>/dev/null || \
    echo "  (grub background not found — generate with scripts/generate-assets.sh)"

cp "$ISO_ROOT/branding/logos/logo.png" \
   "$ISO_ROOT/config/chroot/includes.chroot/usr/share/plymouth/themes/akal-os/logo.png" 2>/dev/null || \
    echo "  (plymouth logo not found — generate with scripts/generate-assets.sh)"

# --- 6. Summary ---
echo ""
echo "=== Web app prepared ==="
echo "App size: $(du -sh "$CHROOT_APP" | cut -f1)"
echo ""
echo "Next: run ./scripts/produce-iso.sh to build the ISO."
