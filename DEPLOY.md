# Deployment Guide

## Option 1: Full app deploy on Render

Use this when you want the frontend, API, and SQLite database to run together.

1. Push this repo to GitHub.
2. In Render, create a new Web Service from the repo.
3. Render will detect `render.yaml` and the `Dockerfile`.
4. Deploy the service.
5. Your site will be served by `server/blog-server.mjs`, and blog posts will be stored in the SQLite file inside the container.

Notes:
- This is the easiest way to keep the current Node + SQLite setup.
- On free or ephemeral hosts, SQLite data may be lost when the instance is rebuilt or replaced unless you attach persistent storage.

## Option 2: Frontend on GitHub Pages, backend somewhere else

Use this when you want the React app on GitHub Pages but still need the blog API.

1. Deploy the backend to a platform that can run the server, such as Render, Railway, or Fly.io.
2. In the frontend build environment, set:
   - `VITE_API_BASE_URL=https://your-backend-url`
   - `VITE_USE_HASH_ROUTER=true`
   - `VITE_BASE_PATH=/your-repo-name/`
3. Build the frontend with `npm run build`.
4. Deploy the `dist` folder to GitHub Pages.

Notes:
- GitHub Pages cannot run `server/blog-server.mjs`.
- `HashRouter` is enabled through `VITE_USE_HASH_ROUTER=true` so routes like `/#/blog` work on GitHub Pages.

## Environment variables

- `VITE_API_BASE_URL`: frontend API URL for production deployments
- `VITE_BASE_PATH`: Vite base path, useful for GitHub Pages repo deployments
- `VITE_USE_HASH_ROUTER`: set to `true` for GitHub Pages
- `PORT`: backend port used by the server host
