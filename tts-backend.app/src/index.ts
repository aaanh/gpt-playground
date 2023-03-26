// src/index.ts

import fs from "fs/promises";

async function main() {
	const text = await fs.readFile("package.json", "utf-8");
	console.log("Content of package.json: ", text);
}

main();
