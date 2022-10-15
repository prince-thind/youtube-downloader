import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('frontend'));


app.get('/', (req, res) => {
   res.sendFile(path.resolve('./frontend/index.html'))
})

app.listen(3000)