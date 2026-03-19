#!/usr/bin/env bash

set -euo pipefail

SITE_BASE_URL="${SITE_BASE_URL:-https://simzhou.com}"
BASE_REF="${1:-}"
HEAD_REF="${2:-HEAD}"

if [ -z "${BASE_REF}" ] || ! git rev-parse --verify --quiet "${BASE_REF}^{commit}" >/dev/null; then
  if git rev-parse --verify --quiet "${HEAD_REF}^" >/dev/null; then
    BASE_REF="$(git rev-parse "${HEAD_REF}^")"
  else
    BASE_REF="$(git rev-list --max-parents=0 "${HEAD_REF}" | tail -n 1)"
  fi
fi

git diff --name-only "${BASE_REF}" "${HEAD_REF}" -- docs \
  | while IFS= read -r path; do
      case "${path}" in
        docs/*.html)
          rel="${path#docs}"

          case "${rel}" in
            /404.html|/en/404.html)
              continue
              ;;
          esac

          if [ "${rel}" = "/index.html" ]; then
            printf '%s/\n' "${SITE_BASE_URL%/}"
            continue
          fi

          if [ "${rel}" = "/en/index.html" ]; then
            printf '%s/en/\n' "${SITE_BASE_URL%/}"
            continue
          fi

          if [[ "${rel}" == */index.html ]]; then
            dir="${rel%/index.html}"
            printf '%s%s/\n' "${SITE_BASE_URL%/}" "${dir}"
            continue
          fi

          page="${rel%.html}"
          printf '%s%s\n' "${SITE_BASE_URL%/}" "${page}"
          ;;
      esac
    done \
  | sort -u
