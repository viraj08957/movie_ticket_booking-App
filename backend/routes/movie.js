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

router.put('/update-movie/:id', async (req, res) => {
    const movieId = req.params.id;
    const { title, description, genre, releaseDate, image } = req.body;

    try {
       
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            { title, description, genre, releaseDate, image },
            { new: true } 
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/delete-movie/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully', movie });
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;