/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const POKEDEX = require('./pokedex.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');

    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized Request' });
    }
    // move to next middleware
    next();
});

const validTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

function handleGetTypes(req, res) {
    res.json(validTypes);
}

app.get('/types', handleGetTypes);

function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;
    const { name, type } = req.query;

    // filter our pokemon by name if name query param is present
    if(name) {
        response = response.filter(pokemon =>
            // case insensitive searching
            pokemon
                .name
                .toLowerCase()
                .includes(name.toLowerCase()));
    }

    // filter our pokemon by type if type query param is present
    if(type) {
        response = response.filter(pokemon =>
            pokemon
                .type
                .includes(type));
    }

    if(!name) {
        return res
            .status(400)
            .send('Please provide a pokemon to name for.');
    }

    if(!type) {
        return res
            .status(400)
            .send('Please provide a pokemon to name for.');
    }

    res
        .json(response);
}

app.get('/pokemon', handleGetPokemon);







const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

