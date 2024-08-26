

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.js');

dotenv.config();

const app = express();


const MONGODB_URI = "mongodb+srv://viraj089:%40Jaishreeram@cluster0.iepad.mongodb.net/";
const DB_NAME = "signIn_signUp";


// MongoDB connection
const connectDB = async () => {
    try {
        const connectionString = `${MONGODB_URI}${DB_NAME}`;
        await mongoose.connect(connectionString);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.use("/", (req, res) => {
    console.log("test route");
    res.send("Server is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Server initialization
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
