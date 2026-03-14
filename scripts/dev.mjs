import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  spawn("node", ["server/blog-server.mjs"], {
    stdio: "inherit",
    env: { ...process.env, PORT: process.env.PORT || "4000" },
  }),
  spawn(npmCommand, ["run", "dev:client"], {
    stdio: "inherit",
    env: process.env,
  }),
];

const shutdown = (signal) => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
};

for (const child of processes) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown("SIGTERM");
      process.exit(code);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
