import express from 'express';
import path from 'path';
import initIO from './lib/io/io.js';

const app = express();

app.use(express.static('frontend'));


app.get('/', (req, res) => {
   res.sendFile(path.resolve('./frontend/index.html'))
})


const server=app.listen(3000);
initIO(server);
