import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "projects", "expense-tracker-js");
const server = createServer(async (request, response) => {
  try {
    const requested = request.url === "/" ? "index.html" : request.url?.split("?")[0].replace(/^\//, "") ?? "index.html";
    const filePath = normalize(join(root, requested));
    if (!filePath.startsWith(root)) throw new Error("Invalid path");
    const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" }[extname(filePath)] ?? "application/octet-stream";
    const body = await readFile(filePath);
    response.writeHead(200, { "Content-Type": mime }); response.end(body);
  } catch { if (!response.headersSent) response.writeHead(404); response.end("Not found"); }
});

server.listen(4174, "127.0.0.1", () => console.log("Expense tracker available at http://127.0.0.1:4174"));
