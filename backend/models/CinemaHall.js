const mongoose = require('mongoose');

const CinemaHallSchema = new mongoose.Schema({
    hallNumber: {
        type: Number,
        required: true,
        unique: true
    },
    filmName: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    numberOfSoldTickets: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value <= this.numberOfSeats;
            },
            message: 'Number of sold tickets cannot exceed number of seats'
        }
    },
    priceOfShow: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CinemaHall', CinemaHallSchema);
