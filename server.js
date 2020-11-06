/* eslint-disable indent */
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
    res.send('Howdy, world!');
});

app.get('/pokemon', (req, res) => {
    const { name, type } = req.query;
    
});







const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

