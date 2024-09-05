const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
    trim: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  ticketPrice:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model('Show', showSchema);
