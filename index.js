import path from 'path';
import express from 'express';
import http from 'http';
import open from 'open';
import { Server } from 'socket.io';
import IOConnectionHandler from './lib/IO.js';
import processInput from './lib/processInput.js';
import state from './lib/state.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', IOConnectionHandler);


app.use(express.json());
app.use(express.static(path.resolve("./frontend")))

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve("./frontend/index.html"));
// })

app.post("/", async (req, res) => {
    try {
        await processInput(req.body)
        return res.sendStatus(200)
    }
    catch (error) {
        console.error(error);
        io.emit('error', error.message);
        io.emit('progress', { message: 'Error', showPercentage: false, percentage: 0 })
        state.downloading = false;
        state.stream = null;
        return res.sendStatus(500);
    }
})

server.listen(3000);

if (process.argv[2] !== 'development') {
    (async () => {
        await open('http://localhost:3000');
    })()
}



export { io, server }


//todo
// look for cross platform pick button