const fs = require("fs");
const ytdl = require("ytdl-core");
const { exec } = require("child_process");
const cliProgress = require("cli-progress");

const audioBar = new cliProgress.SingleBar({
  format: "Audio: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
});
const videoBar = new cliProgress.SingleBar({
  format: "Video: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
});

async function download(url, name) {
  await clean();
  await downloadAudio(url);
  await downloadVideo(url);
  await merge(name);
  await clean();
}

async function downloadAudio(url, name = "temp.wav", path = "./output/") {
  audioBar.start(10000, 0);

  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestaudio" });

    stream.on("progress", (_, current, total) => {
      trackProgress(audioBar, current, total);
    });
    stream.on("finish", () => {
      resolve();
      audioBar.stop();
    });
    stream.on("error", (e) => {
      console.log(e);
      reject(e);
    });
    stream.pipe(fs.createWriteStream(path + name));
  });
}

async function downloadVideo(url, name = "temp.mp4", path = "./output/") {
  videoBar.start(10000, 0);

  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestvideo" });

    stream.on("progress", (_, current, total) => {
      trackProgress(videoBar, current, total);
    });

    stream.on("finish", () => {
      resolve();
      videoBar.stop();
    });
    stream.on("error", (e) => {
      reject(e);
    });
    stream.pipe(fs.createWriteStream(path + name));
  });
}

async function clean() {
  const command = "rm -f ./output/temp.mp4 ./output/temp.wav";
  await executeCommand(command);
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
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
}

function trackProgress(progressBar, current, total) {
  const percentage = Math.round((current / total) * 10000);
  progressBar.update(percentage);
}

module.exports = download;
