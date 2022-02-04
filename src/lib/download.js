const fs = require("fs");
const ytdl = require("ytdl-core");

async function download(url, name, path = "./output/") {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url).pipe(fs.createWriteStream(path + name+'.mp4'));

    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (e) => {
      reject(e);
    });
  });
}

module.exports = download;
