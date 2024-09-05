const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

// Route to add a ticket
router.post('/add-ticket', async (req, res) => {
  const { email, movieTitle, dateOfPurchase, timeOfShow, ticketPrice, seats } = req.body;

  try {
    const newTicket = new Ticket({
      email,
      movieTitle,
      dateOfPurchase,
      timeOfShow,
      ticketPrice,
      seats,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket details saved successfully' });
  } catch (error) {
    console.error('Error saving ticket details:', error);
    res.status(500).json({ error: 'Failed to save ticket details' });
  }
});

module.exports = router;
