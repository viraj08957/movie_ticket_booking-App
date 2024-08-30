const express = require("express")
const CinemaHall = require("../models/CinemaHall");
const {body,validationResult} = require("express-validator");
const {getAllCinemaHalls,getCinemaHallById,getCinemaHallsByFilmName}=require("../controllers/cinemaHallController");


const router = express.Router();

const validateCinemaHall = [
    body('hallNumber').isInt().withMessage('Hall number must be an integer'),
    body('filmName').isString().notEmpty().withMessage('Film name is required'),
    body('numberOfSeats').isInt({ gt: 0 }).withMessage('Number of seats must be greater than zero'),
    body('numberOfSoldTickets').isInt({ min: 0 }).withMessage('Number of sold tickets cannot be negative'),
    body('priceOfShow').isFloat({ gt: 0 }).withMessage('Price of show must be a positive number'),
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
    body('time').isString().notEmpty().withMessage('Time is required')
];


router.post('/add-cinema-hall', validateCinemaHall, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { hallNumber, filmName, numberOfSeats, numberOfSoldTickets, priceOfShow, date, time } = req.body;

        // Check if the hall number already exists
        const existingHall = await CinemaHall.findOne({ hallNumber });
        if (existingHall) {
            return res.status(400).json({ message: 'Cinema hall number already exists' });
        }

        const newCinemaHall = new CinemaHall({
            hallNumber,
            filmName,
            numberOfSeats,
            numberOfSoldTickets,
            priceOfShow,
            date,
            time
        });

        await newCinemaHall.save();
        res.status(201).json({ message: 'Cinema hall added successfully', cinemaHall: newCinemaHall });
    } catch (error) {
        console.error('Error adding cinema hall:', error.message);
        res.status(500).json({ message: 'Failed to add cinema hall' });
    }
});



// Get all cinema halls
router.get('/', getAllCinemaHalls);

// Get cinema hall by ID
router.get('/:id', getCinemaHallById);

// Get cinema halls by film name
router.get('/by-film-name', getCinemaHallsByFilmName);


router.delete('/delete-cinema-hall/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cinemaHall = await CinemaHall.findByIdAndDelete(id);

        if (!cinemaHall) {
            return res.status(404).json({ message: 'Cinema Hall not found' });
        }

        res.status(200).json({ message: 'Cinema Hall deleted successfully', cinemaHall });
    } catch (error) {
        console.error('Error deleting cinema hall:', error.message);
        res.status(500).json({ message: 'Failed to delete cinema hall' });
    }
});

module.exports = router;