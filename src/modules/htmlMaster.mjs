import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const currentPath = path.dirname(fileURLToPath(import.meta.url))
const indexHtmlPath = path.join(currentPath, "../public/", "index.html")

export const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf-8")
