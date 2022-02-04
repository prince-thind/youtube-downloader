const download= require("./lib/download");
const ytpl = require("ytpl");
const URL = process.argv[2];

main(URL);

async function main(url) {
  if (!url) {
    console.error("error: Please specify a Playlist URL");
    return;
  }
  const list = await getPlaylistArray(url);
  for (let i = 0; i < list.length; i++) {
    const videoUrl = list[i];
    await download(videoUrl, "video" + (i + 1));
  }
}

async function getPlaylistArray(url) {
  const res = await ytpl(url);
  return res.items.map((item) => item.shortUrl);
}
