import { spawn } from "node:child_process";

const servers = [
  spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "4173"], { stdio: "inherit" }),
  spawn(process.execPath, ["scripts/serve-expense.mjs"], { stdio: "inherit" }),
];
const stopServers = () => servers.forEach((server) => { if (!server.killed) server.kill(); });
process.on("SIGINT", () => { stopServers(); process.exit(130); });
process.on("SIGTERM", () => { stopServers(); process.exit(143); });

for (const url of ["http://127.0.0.1:4173", "http://127.0.0.1:4174"]) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) break; }
    catch { /* The server is still starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (attempt === 59) { stopServers(); throw new Error(`Test server did not start: ${url}`); }
  }
}

const playwright = spawn(process.execPath, ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)], { stdio: "inherit" });
const exitCode = await new Promise((resolve) => playwright.on("exit", (code) => resolve(code ?? 1)));
stopServers();
process.exit(exitCode);
