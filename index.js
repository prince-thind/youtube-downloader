import express from 'express';
import path from 'path';
import processInput from './lib/downloader/processInput.js';
import initIO from './lib/io/io.js';

const app = express();

app.use(express.static('frontend'));
app.use(express.json())

app.get('/', (req, res) => {
   res.sendFile(path.resolve('./frontend/index.html'))
})

app.post('/', (req, res) => {
   processInput(req.body)
})

const server = app.listen(3000);
const io = initIO(server);

export { io }