#!/usr/bin/env bash
set -e
npx json-server --watch db.json --routes routes.json --port 3000
