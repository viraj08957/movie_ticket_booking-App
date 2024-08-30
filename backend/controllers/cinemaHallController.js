const CinemaHall = require("../models/CinemaHall");


// Get all cinema halls
const getAllCinemaHalls = async (req, res) => {
    try {
        const cinemaHalls = await CinemaHall.find();
        res.status(200).json(cinemaHalls);
    } catch (error) {
        console.error('Error fetching cinema halls:', error.message);
        res.status(500).json({ message: 'Failed to fetch cinema halls' });
    }
};

// Get cinema hall by ID
const getCinemaHallById = async (req, res) => {
    try {
        const { id } = req.params;
        const cinemaHall = await CinemaHall.findById(id);

        if (!cinemaHall) {
            return res.status(404).json({ message: 'Cinema hall not found' });
        }

        res.status(200).json(cinemaHall);
    } catch (error) {
        console.error('Error fetching cinema hall:', error.message);
        res.status(500).json({ message: 'Failed to fetch cinema hall' });
    }
};

// Get cinema halls by film name
const getCinemaHallsByFilmName = async (req, res) => {
    try {
        const { filmName } = req.query;
        if (!filmName) {
            return res.status(400).json({ message: 'Film name query parameter is required' });
        }

        const cinemaHalls = await CinemaHall.find({ filmName });
        
        if (cinemaHalls.length === 0) {
            return res.status(404).json({ message: 'No cinema halls found for the given film name' });
        }

        res.status(200).json(cinemaHalls);
    } catch (error) {
        console.error('Error fetching cinema halls by film name:', error.message);
        res.status(500).json({ message: 'Failed to fetch cinema halls' });
    }
};

module.exports = { getAllCinemaHalls, getCinemaHallById, getCinemaHallsByFilmName };