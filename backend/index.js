const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js'); 

dotenv.config();

const app = express();

MONGODB_URI = "mongodb+srv://viraj089:%40Jaishreeram@cluster0.iepad.mongodb.net/"
DB_NAME = "signIn_signUp"

// MongoDB connection
const connectDB = async () => {
    try {
        const connectionString = `${MONGODB_URI}${DB_NAME}`;
        await mongoose.connect(connectionString, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


app.use(express.json());



app.use('/api/auth', authRoutes);

const PORT = 8000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
