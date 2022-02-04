const download = require("./lib/download");

const url = process.argv[2];

if (!url) {
  console.error("error processing url: ", url);
  return;
}

download(url, "video");
