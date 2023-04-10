
echo "[FRONTEND] Installing dependencies..." && \
(cd next.frontend.app && npm install) && \
echo "\n\n[BACKEND/API] Installing dependencies..." && \
(cd gpt.api.backend.app && npm install)