# youtube-downloader

Title says it all!

# prerequisites

1. Node.js and npm in your system
2. zenity linux package (optional- you will have to type output dir manually without it)

# How to run

1. Install npm packagees by running:
<pre>npm i</pre>

2. Start the Application :
<pre>npm start</pre>

# Remarks and Contribution

+ zenity package is linux(gnome-like) only. I coudn't find a way to open the folder upload screen from within the nodeJS in a cross platform way. There seems to be no package to do that which is very strange because this is the first time I have come across such a situation when there is no package for my requirement. Will be glad to hear more from others!

+ There is no easy way to ship express apps in a cross platform way. One needs to have nodejs installed. I tried [pkg](https://www.npmjs.com/package/pkg) but unfortunately it has issues with properly bundling ffmpeg which is a core part of this project.

I tried my best to convert this application to a full front end only application. However I faced some major challenges, if you know how one could byepass these restrictions ping me without any delay!

1. [ytdl-core](https://www.npmjs.com/package/ytdl-core) uses fetch/miniget under the hood. To be able to run it on frontend, you need to byepass cors restriction and only way to do that is likely through a proxy. I have not come close to a decent package for that. I could ofcourse right my own proxy server but that defeats the purpose of keeping it front end only.

2.  There is no easy way to hadle large files on the frontend. There is a [File System Access Api](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) but it has poor broswer support. I came across [stream-saver](https://www.npmjs.com/package/streamsaver) but I am not sure how to incorporate into the whole scenario.

3. For higher quality videos, ffmpeg is needed for merging the video and audio. There is currently only one library([ffmpegwasm](https://github.com/ffmpegwasm/ffmpeg.wasm)) for using ffmpeg on the frontend and it has some issues with site headers, so you really need to host your own server to be able to work with it. Although, I have heard some people have been able to work with this library successfully on github pages. 

4. I am a university student and rarely get free time to pursue vanity projects. Also, one can easily judge from the code that I am still not able to write clean(readble) enough code. Implementation of this project on front end is a big task and I'm afraid I am not up for the task yet. Although, I am willing to collaborate with anyone who wants to work with me.

# Motivation

I always struggled to find a reliable way to download youtube playlists. Moreover many of the sites which claim to download videos were always hidden behind pay walls or were painful to use (ads and poor design). I also wanted to build something practically useful and I believe It is one of my most useful projects, if not the most. 

# Thank you
Thank you for reaching so far in this readme. If you have made this far, I believe you, the reader, are an interesting person why not ping me to have a casual conversation? I reall like tech focused conversatiosn and stuff!
