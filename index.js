#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";

const [, , command, componentName] = process.argv;

const addComponent = async (name) => {
  const componentPath = path.join(process.cwd(), "components", `${name}.js`);
  const content = `// ${name} component\n\nexport default function ${name}() {\n  return <div>${name}</div>;\n}\n`;

  try {
    await fs.mkdir(path.dirname(componentPath), { recursive: true });
    await fs.writeFile(componentPath, content, "utf8");
    console.log(`Component ${name} created at ${componentPath}`);
  } catch (error) {
    console.error("Error creating component:", error);
  }
};

if (command === "add" && componentName) {
  addComponent(componentName);
} else {
  console.log("Usage: npx mypackage add [component]");
}
