import fs from "node:fs";

export function fileExists(path: fs.PathLike): Promise<boolean> {
  return new Promise((resolve) => {
    fs.open(path, "r", (err, fd) => {
      if (err) {
        return resolve(false);
      }
      fs.close(fd, () => { resolve(true); });
    });
  });
}

export function customReadStream(filePathFs: fs.PathLike): Promise<string | null> {
  return new Promise((resolve) => {
    const data: Buffer[] = [];

    const readStream = fs.createReadStream(filePathFs, { flags: "r" });
    readStream.on("data", (chunks) => { data.push(Buffer.from(chunks)) });
    readStream.on("end", () => resolve(Buffer.concat(data).toString()));
    readStream.on("error", () => resolve(null));
  });
}

export function customWriteStream(filePathFs: fs.PathLike, data: any): Promise<Error | null> {
  return new Promise((resolve) => {
    const stream = fs.createWriteStream(filePathFs, { flags: "w+" });
    stream.on("ready", () => {
      stream.write(data);
      stream.end();
    });

    stream.on("finish", () => resolve(null));
    stream.on("error", (err) => resolve(err));
  });
}