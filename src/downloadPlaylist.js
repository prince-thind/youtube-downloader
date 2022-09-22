const download = require("./lib/download");
const ytpl = require("ytpl");
const dialog = require('dialog-node');


dialog.entry('Enter Playlist Url', "Youtube Downloader", 0, handleInput);

async function handleInput(exitCode, input, stderr) {
  if (exitCode != 0) return;
  if (!input) return console.error('no input was specified. Terminating!')

  await main(input);
  console.log('You may now exit')
  process.stdin.resume();
}

async function main(url) {
  if (!url) {
    console.error("error: Please specify a Playlist URL");
    return;
  }
  const list = await getPlaylistArray(url);
  for (let i = 0; i < list.length; i++) {
    const videoUrl = list[i].url;
    console.log('downloading video: ', i + 1)
    await download(videoUrl, "video" + (i + 1));
    console.log('\n')

  }
}

async function getPlaylistArray(url) {
  const res = await ytpl(url, { pages: Infinity });
  return res.items.map((item) => ({ url: item.shortUrl, title: item.title }));
}
