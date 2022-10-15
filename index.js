import express from 'express';
import path from 'path';
import open from 'open';
import processInput from './lib/downloader/processInput.js';
import initIO from './lib/io/io.js';

const app = express();

app.use(express.static('frontend'));
app.use(express.json())

app.get('/', (req, res) => {
   res.sendFile(path.resolve('./frontend/index.html'))
})

app.post('/', async (req, res) => {
   try {
      await processInput(req.body)
   }
   catch (e) {
      console.log(e);
      io.emit('error', e.message)
   }
})

const server = app.listen(3000);
const io = initIO(server);

openApp();
async function openApp() {
   await open('http://localhost:3000');
}

export { io }