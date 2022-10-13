const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');

module.exports = function download(outputPath, url,{progressBar,percentageBar}) {

    const stream = ytdl(url);

    stream.on('progress', (_, totalDownloaded, totalSize) => {
        const percentage = Math.round(totalDownloaded / totalSize * 100);
        updateProgressBar(percentage,{percentageBar,progressBar})
    })


    stream.pipe(fs.createWriteStream(path.join(outputPath, "./video.mp4")));
}


 function updateProgressBar (value,{progressBar,percentageBar}) {
    progressBar.value = value;
    percentageBar.textContent = value + "%";
    percentageBar.classList.remove('hidden');
}