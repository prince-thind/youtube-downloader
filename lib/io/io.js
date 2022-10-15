import { Server } from "socket.io";
import state from "../downloader/state.js";
import pickDir from "../utilities/pickDir.js";

export default function initIO(server) {

    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('pick-dir', () => {
            pickDir();
        });

        socket.on('stop', () => {
            state.stream?.destroy();
            state.stream?.emit('close')
            state.stream=null;
            io.emit('progress',{message:'cancelled', progress:0})
        })

    });

    return io;
}

