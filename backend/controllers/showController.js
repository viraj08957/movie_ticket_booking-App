const Show = require("../models/Show");

exports.getAllShows = async (req, res) => {
    try {
      const shows = await Show.find().populate('movieId', 'title'); 
      res.status(200).json(shows);
    } catch (error) {
      console.error('Error fetching shows:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  