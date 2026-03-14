import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import seedPosts from "../src/data/blogSeed.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataDirectory = path.join(projectRoot, "server", "data");
const databasePath = path.join(dataDirectory, "blog.sqlite");
const distDirectory = path.join(projectRoot, "dist");
const port = Number(process.env.PORT || 4000);

mkdirSync(dataDirectory, { recursive: true });

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function runSql(sql, options = {}) {
  return execFileSync("sqlite3", options.json ? ["-json", databasePath, sql] : [databasePath, sql], {
    encoding: "utf8",
  }).trim();
}

function formatContent(content) {
  return content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function createPostRecord(input) {
  const slug = input.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: `${slug || "post"}-${Date.now()}`,
    title: input.title.trim(),
    category: input.category.trim(),
    date: new Date().toISOString().split("T")[0],
    image:
      input.image?.trim() ||
      "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=800&q=80",
    excerpt: input.excerpt.trim(),
    content: formatContent(input.content),
  };
}

function insertPost(post) {
  runSql(`
    INSERT INTO blog_posts (id, title, category, date, image, excerpt, content)
    VALUES (
      ${sqlString(post.id)},
      ${sqlString(post.title)},
      ${sqlString(post.category)},
      ${sqlString(post.date)},
      ${sqlString(post.image)},
      ${sqlString(post.excerpt)},
      ${sqlString(post.content)}
    );
  `);
}

function ensureDatabase() {
  runSql(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  const count = Number(runSql("SELECT COUNT(*) FROM blog_posts;"));

  if (count > 0) {
    return;
  }

  for (const post of seedPosts) {
    insertPost(post);
  }
}

function readPosts() {
  const result = runSql(
    `
      SELECT id, title, category, date, image, excerpt, content
      FROM blog_posts
      ORDER BY date DESC, rowid DESC;
    `,
    { json: true }
  );

  return result ? JSON.parse(result) : [];
}

function readPost(id) {
  const result = runSql(
    `
      SELECT id, title, category, date, image, excerpt, content
      FROM blog_posts
      WHERE id = ${sqlString(id)}
      LIMIT 1;
    `,
    { json: true }
  );

  const posts = result ? JSON.parse(result) : [];
  return posts[0] ?? null;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });

    request.on("error", reject);
  });
}

function validateInput(input) {
  if (!input || typeof input !== "object") {
    return "A blog post payload is required.";
  }

  const requiredFields = ["title", "category", "excerpt", "content"];

  for (const field of requiredFields) {
    if (typeof input[field] !== "string" || input[field].trim() === "") {
      return `${field} is required.`;
    }
  }

  if (input.image && typeof input.image !== "string") {
    return "image must be a string.";
  }

  return null;
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

async function serveStaticAsset(requestPath, response) {
  if (!existsSync(distDirectory)) {
    sendJson(response, 404, { error: "Frontend build not found." });
    return;
  }

  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const assetPath = path.normalize(path.join(distDirectory, normalizedPath));

  if (!assetPath.startsWith(distDirectory)) {
    sendJson(response, 403, { error: "Forbidden." });
    return;
  }

  try {
    const assetStats = await stat(assetPath);

    if (assetStats.isDirectory()) {
      return serveStaticAsset(path.join(requestPath, "index.html"), response);
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(assetPath)] || "application/octet-stream",
    });
    createReadStream(assetPath).pipe(response);
  } catch {
    const fallbackHtml = path.join(distDirectory, "index.html");

    if (!existsSync(fallbackHtml)) {
      sendJson(response, 404, { error: "Not found." });
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(readFileSync(fallbackHtml));
  }
}

ensureDatabase();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/posts") {
    sendJson(response, 200, readPosts());
    return;
  }

  if (request.method === "GET" && requestUrl.pathname.startsWith("/api/posts/")) {
    const id = decodeURIComponent(requestUrl.pathname.replace("/api/posts/", ""));
    const post = readPost(id);

    if (!post) {
      sendJson(response, 404, { error: "Post not found." });
      return;
    }

    sendJson(response, 200, post);
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/posts") {
    try {
      const input = await readRequestBody(request);
      const validationError = validateInput(input);

      if (validationError) {
        sendJson(response, 400, { error: validationError });
        return;
      }

      const post = createPostRecord(input);
      insertPost(post);
      sendJson(response, 201, post);
    } catch (error) {
      sendJson(response, 400, { error: error instanceof Error ? error.message : "Unable to create post." });
    }
    return;
  }

  await serveStaticAsset(requestUrl.pathname, response);
});

server.listen(port, () => {
  console.log(`Blog server listening on http://localhost:${port}`);
});
