import { Server } from "socket.io";
import pickDir from "../utilities/pickDir.js";

export default function initIO(server) {
    
    const io = new Server(server);

    io.on('connection', (socket) => {
        
        socket.on('pick-dir',()=>{
            pickDir();
        });

    });

    return io;
}

