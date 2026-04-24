#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

cd "${REPO_ROOT}"

if [[ ! -f "${SCRIPT_DIR}/.env.production" ]]; then
  echo "Missing ${SCRIPT_DIR}/.env.production"
  exit 1
fi

docker compose -f "${SCRIPT_DIR}/compose.yaml" down --remove-orphans
docker compose -f "${SCRIPT_DIR}/compose.yaml" up -d --build

sleep 5
curl --fail --silent http://127.0.0.1/api/healthz >/dev/null

echo "Deployment completed successfully."
