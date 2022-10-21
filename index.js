import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import IOConnectionHandler from './lib/IO.js';
import processInput from './lib/processInput.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', IOConnectionHandler);


app.use(express.json());
app.use(express.static(path.resolve("./frontend/")))


app.get("/", (req, res) => {
    res.sendFile(path.resolve("./frontend/index.html"));
})

app.post("/", (req, res) => {
    processInput(req.body).catch(error => {
        console.error(error);
        io.emit('error', error.message);
        io.emit('progress', { message: 'Error', showPercentage: false, percentage: 0 })

    })
})

server.listen(3000);

export { io }


//todo
// add disconnect reset
// look for cross platform pick button