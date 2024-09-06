const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const showRoutes = require('./routes/Show');
const cinemaHallRoutes = require("./routes/cinemaHall");
const contactRoutes = require("./routes/contact");
const ticketRoutes = require("./routes/ticket");



dotenv.config();

const app = express();

const MONGODB_URI = "mongodb+srv://viraj089:%40Jaishreeram@cluster0.iepad.mongodb.net/";
const DB_NAME = "signIn_signUp";

const connectDB = async () => {
    try {
        const connectionString = `${MONGODB_URI}${DB_NAME}`;
        await mongoose.connect(connectionString, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};




app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/cinema-halls',cinemaHallRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/tickets',ticketRoutes);



app.use("/", (req, res) => {
    res.send("Server is running!");
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(err.status || 500).json({ message: err.message });
});

const PORT = 8000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
