import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

type TResult = { [key: string]: string };

const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dir = path.join(__dirname, "svg");
const target = path.join(__dirname, "src/components/Icon/IconNames.ts");

const dataPrefix = /data-prefix="[a-z]*"/g;
const className = /class="[a-zA-z\s\-0-9]*"/g;

const result: TResult = {};

async function readDir() {
  const list = await readdir(dir);

  for (let i = 0; i < list.length; i++) {
    const file = list[i];
    if (file.endsWith(".svg")) {
      let content = await (await readfile(path.join(dir, file))).toString();
      content = content.replace(dataPrefix, "");
      content = content.replace(className, "");

      const name = file.replace(".svg", "").replace(/-/g, "_").toUpperCase();
      result[name] = `${content}`;
    }
  }

  const fileContent = `
    export const Icons = ${JSON.stringify(result)};
    export type TIconNames = keyof typeof Icons;
    `;

  try {
    await writeFile(target, fileContent);
  } catch (error) {
    console.error(error);
  }
}

readDir();
