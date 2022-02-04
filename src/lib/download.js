const fs = require("fs");
const ytdl = require("ytdl-core");
const { exec } = require("child_process");

async function download(url, name) {
  await downloadAudio(url);
  await downloadVideo(url);
  await merge(name);
  await clean();
}

async function downloadVideo(url, name = "temp.mp4", path = "./output/") {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestvideo" }).pipe(
      fs.createWriteStream(path + name)
    );

    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (e) => {
      reject(e);
    });
  });
}

async function downloadAudio(url, name = "temp.wav", path = "./output/") {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestaudio" }).pipe(
      fs.createWriteStream(path + name)
    );

    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (e) => {
      reject(e);
    });
  });
}

async function clean() {
  const command = "rm ./output/temp.mp4 ./output/temp.wav";
  executeCommand(command);
}

async function merge(name = "video") {
  const command = `ffmpeg -i ./output/temp.mp4 -i ./output/temp.wav -c:v copy -c:a aac ./output/${name}.mp4`;
  await executeCommand(command);
}

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
}


module.exports = download
