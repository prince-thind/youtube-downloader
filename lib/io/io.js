import { Server } from "socket.io";

export default function initIO(server) {
    
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
    });
}