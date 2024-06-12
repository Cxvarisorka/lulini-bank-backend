import express from 'express';
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send("Helloooo")
});

app.listen(port, () => {
    console.log(`Listening port at ${port}`)
});