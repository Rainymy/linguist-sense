import { type PathLike, createReadStream } from "node:fs";
import { basename, extname } from "node:path";

export function customReadStream(filePathFs: PathLike): Promise<Buffer | Error> {
  return new Promise((resolve) => {
    const data: Buffer[] = [];

    const readStream = createReadStream(filePathFs, { flags: "r" });
    readStream.on("data", (chunks) => { data.push(Buffer.from(chunks)) });
    readStream.on("end", () => resolve(Buffer.concat(data)));
    readStream.on("error", (error) => resolve(error));
  });
}

export function parseFilePath(filepath: string) {
  const filename = basename(filepath);
  const ext = filename.startsWith('.') ? filename : extname(filename);
  return {
    dotExt: ext,
    ext: ext.startsWith('.') ? ext.slice(1) : ext,
    basename: filename,
  }
}