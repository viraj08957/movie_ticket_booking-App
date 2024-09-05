const express = require("express");
const router = express.Router();
const Show = require("../models/Show");
const Movie = require("../models/Movie");
const showController = require("../controllers/showController");

router.post('/add-show', async (req, res) => {
    try {
      const { movieTitle, date, time, availableSeats,ticketPrice } = req.body;
  
      const movie = await Movie.findOne({ title: movieTitle });
  
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
     
      const newShow = new Show({
        movieTitle,
        movieId: movie._id,
        date,
        time,
        availableSeats,
        ticketPrice
      });
  
      await newShow.save();
      res.status(201).json(newShow);
  
    } catch (error) {
      console.error('Error adding show:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/get-all-shows', showController.getAllShows);

  router.delete('/delete-show/:id', async (req, res) => {
  try {
    const showId = req.params.id;
    await Show.findByIdAndDelete(showId);
    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error('Error deleting show:', error);
    res.status(500).json({ error: 'Error deleting show' });
  }
});

  
  module.exports = router;