#!/bin/bash
# Kopeerib prototüübi assets/ → next-app/public/assets/
# Käivita: bash scripts/copy-assets.sh
#
# Eeldab, et prototüübi assets/ kaust asub samas kaustas mis handoff/
# Muuda ASSETS_SRC vajadusel.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NEXT_APP_DIR="$(dirname "$SCRIPT_DIR")"
ASSETS_SRC="${NEXT_APP_DIR}/../handoff/src/assets"
ASSETS_DST="${NEXT_APP_DIR}/public/assets"

if [ ! -d "$ASSETS_SRC" ]; then
  echo "❌  assets/ ei leitud: $ASSETS_SRC"
  echo "   Muuda ASSETS_SRC skriptis või kopeeri käsitsi:"
  echo "   cp -r /path/to/assets/* $ASSETS_DST/"
  exit 1
fi

echo "📂  Kopeerime: $ASSETS_SRC → $ASSETS_DST"
cp -r "$ASSETS_SRC/." "$ASSETS_DST/"
echo "✅  Valmis! Pildid on nüüd next-app/public/assets/ all."
