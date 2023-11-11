import express from 'express';

const app = express();

app.listen(5000, () => {
    console.log('The server is listening port 5000');
});