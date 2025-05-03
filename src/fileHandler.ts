import fs from "node:fs";

export function customReadStream(filePathFs: fs.PathLike): Promise<Buffer | Error> {
  return new Promise((resolve) => {
    const data: Buffer[] = [];

    const readStream = fs.createReadStream(filePathFs, { flags: "r" });
    readStream.on("data", (chunks) => { data.push(Buffer.from(chunks)) });
    readStream.on("end", () => resolve(Buffer.concat(data)));
    readStream.on("error", (error) => resolve(error));
  });
}