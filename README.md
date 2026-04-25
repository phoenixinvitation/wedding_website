# Wedding Site

## Blessings Backend Setup

The blessings section now supports a shared backend endpoint with local `localStorage` fallback.

1. Copy `.env.example` to `.env.local`.
2. Keep `VITE_BLESSINGS_API_URL=/api/blessings` for local + Vercel deployments.
3. In Vercel project environment variables, add:
   - `JSONBIN_BIN_ID`
   - `JSONBIN_API_KEY`
   - `JSONBIN_ACCESS_KEY` (optional)

Without JSONBin variables, the API will fall back to in-memory storage and client `localStorage`.
