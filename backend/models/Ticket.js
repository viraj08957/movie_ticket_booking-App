const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  email: { type: String, required: true },
  movieTitle: { type: String, required: true },
  dateOfPurchase: { type: Date, default: Date.now },
  timeOfShow: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  seats: { type: [String], required: true },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
