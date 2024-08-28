const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const showRoutes = require("./routes/Show");

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


app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(helmet());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); 
app.use('/api/shows',showRoutes);


app.use("/", (req, res) => {
    console.log("test route");
    res.send("Server is running!");
});


app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message); // Log error message
    res.status(err.status || 500).json({ message: err.message });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});




