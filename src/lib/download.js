const fs = require("fs");
const ytdl = require("ytdl-core");
const cliProgress = require("cli-progress");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');


ffmpeg.setFfmpegPath(ffmpegPath);


async function download(url, name) {
  await mkdirOutput();
  await downloadAudio(url);
  await downloadVideo(url);
  await merge(name);
  await removeTempFiles();
}

async function mkdirOutput() {
  const outputExists = fs.existsSync('./output/');
  if (outputExists) return;

  fs.mkdirSync('./output');
}

async function downloadAudio(url, name = "temp.wav", path = "./output/") {

  const progressBar = new cliProgress.SingleBar({
    format: "{type}: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
  });

  progressBar.start(10000, 0, {
    type: 'Audio'
  });


  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { filter: 'audioonly' });
    stream.pipe(fs.createWriteStream(path + name));


    stream.on("progress", (_, current, total) => {
      trackProgress(progressBar, current, total);
    });
    stream.on("finish", () => {
      resolve();
      progressBar.stop();

    });
    stream.on("error", (e) => {
      console.log(e);
      reject(e);
    });
  });
}

async function downloadVideo(url, name = "temp.mp4", path = "./output/") {

  const progressBar = new cliProgress.SingleBar({
    format: "{type}: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
  });

  progressBar.start(10000, 0, {
    type: 'Video'
  });

  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestvideo" });

    stream.on("progress", (_, current, total) => {
      trackProgress(progressBar, current, total);
    });

    stream.on("finish", () => {
      resolve();
      progressBar.stop();

    });
    stream.on("error", (e) => {
      reject(e);
    });
    stream.pipe(fs.createWriteStream(path + name));
  });
}

async function removeTempFiles() {
  if (fs.existsSync('./output/temp.wav'))
    fs.unlinkSync('./output/temp.wav');

  if (fs.existsSync('./output/temp.mp4'))
    fs.unlinkSync('./output/temp.mp4');
}

async function merge(name = "video") {

  const progressBar = new cliProgress.SingleBar({
    format: "{type}: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
  });

  progressBar.start(10000, 0, {
    type: 'Merging'
  });


  return new Promise((resolve, reject) => {
    ffmpeg()
      .addInput('./output/temp.mp4')
      .addInput('./output/temp.wav')
      .saveToFile(`./output/${name}.mp4`)
      .on('progress', (progress) => {
        trackProgress(progressBar, progress.percent, 100);
      })
      .on('end', () => {
        resolve();
        trackProgress(progressBar, 100, 100);
        progressBar.stop();

      })
      .on('err', function (err) {
        console.log('erron in ffmpeg: ' + err.message);
        reject();
      })
     

  })
}

function trackProgress(progressBar, current, total) {
  const percentage = Math.round((current / total) * 10000);
  progressBar.update(percentage);
}

module.exports = download;
