#!/bin/bash
# usage: run.sh W H tag
cd /tmp/pf/site && PARITY_CONTENT=/tmp/pf/parity-fixtures SITE_BASE=/ npx astro build --outDir dist-parity >/dev/null 2>&1
cd dist-parity && python3 -m http.server 4322 --bind 127.0.0.1 >/dev/null 2>&1 &
P=$!; sleep 1; cd /tmp/pf/measure && node compare.mjs "$1" "$2" "$3"; kill $P
