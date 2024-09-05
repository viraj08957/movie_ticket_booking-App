const express = require('express');
const Movie = require('../models/Movie');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Middleware for validation
const validateMovie = [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('genre').isString().notEmpty().withMessage('Genre is required'),
    body('releaseDate').isISO8601().toDate().withMessage('Invalid release date'),
    body('image').isURL().withMessage('Invalid image URL'),
];

// Add movie route
router.post('/add-movie', validateMovie, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, genre, releaseDate, image } = req.body;

        const newMovie = new Movie({
            title,
            description,
            genre,
            releaseDate,
            image,
        });
        
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.error('Error adding movie:', error.message);
        res.status(400).json({ message: 'Failed to add movie' });
    }
});

// Get all movies route
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

// Update movie route
router.put('/update-movie/:id', validateMovie, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
        console.error('Error updating movie:', error.message);
        res.status(400).json({ message: 'Failed to update movie' });
    }
});

// Delete movie route
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
        res.status(500).json({ message: 'Failed to delete movie' });
    }
});

router.get('/search-by-name', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    try {
        const movies = await Movie.find({
            title: { $regex: name, $options: 'i' } // Case-insensitive search
        });

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error searching for movies:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
