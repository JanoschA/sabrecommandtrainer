#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

cd "${REPO_ROOT}"

if [[ ! -f "${SCRIPT_DIR}/.env.production" ]]; then
  echo "Missing ${SCRIPT_DIR}/.env.production"
  exit 1
fi

set -a
source "${SCRIPT_DIR}/.env.production"
set +a

if [[ -n "${GHCR_USERNAME:-}" && -n "${GHCR_TOKEN:-}" ]]; then
  printf '%s' "${GHCR_TOKEN}" | docker login ghcr.io -u "${GHCR_USERNAME}" --password-stdin
fi

docker compose -f "${SCRIPT_DIR}/compose.yaml" pull
docker compose -f "${SCRIPT_DIR}/compose.yaml" up -d --remove-orphans

sleep 5
curl --fail --silent http://127.0.0.1/api/healthz >/dev/null

echo "Deployment completed successfully."
