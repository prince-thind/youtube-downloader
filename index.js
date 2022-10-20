import path from 'path';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import IOConnectionHandler from './lib/IO.js';

const app=express();
const server=http.createServer(app);

const io=new Server(server);
io.on('connection', IOConnectionHandler);


app.use(express.json());
app.use(express.static(path.resolve("./frontend/")))


app.get("/",(req,res)=>{
    res.sendFile(path.resolve("./frontend/index.html"));
})

server.listen(3000);

export {io}