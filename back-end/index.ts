import express from 'express';

const app = express();

app.use('/api/helloWorld', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => console.log(`Buzz backend is listening on port ${port}!`));