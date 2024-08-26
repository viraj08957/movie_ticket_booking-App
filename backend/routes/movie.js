const express = require('express');
const Movie = require("../models/Movie");

const router = express.Router();

router.post('/add-movie', async (req, res) => {
    try {
        const { title, description, genre, releaseDate, image } = req.body;

      
        const newMovie = new Movie({
            title,
            description,
            genre,
            releaseDate,
            image 
        });

        
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;