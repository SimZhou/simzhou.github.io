#!/usr/bin/env bash

set -euo pipefail

HOST="simzhou.com"
KEY="2696c9db-b5a7-457c-b5d5-08557966975a"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
ENDPOINT="${INDEXNOW_ENDPOINT:-https://api.indexnow.org/indexnow}"

if [ "$#" -eq 0 ]; then
  cat <<'EOF'
Usage:
  scripts/submit_indexnow.sh <url1> [url2 ...]

Example:
  scripts/submit_indexnow.sh \
    https://simzhou.com/ \
    https://simzhou.com/posts/ \
    https://simzhou.com/en/
EOF
  exit 1
fi

json_urls=""
for url in "$@"; do
  if [ -n "${json_urls}" ]; then
    json_urls="${json_urls}, "
  fi
  json_urls="${json_urls}\"${url}\""
done

payload=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [${json_urls}]
}
EOF
)

curl -sS -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data "${payload}"

printf '\n'
