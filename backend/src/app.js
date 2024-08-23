import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth.js';

const app = express();

// Your middleware and routes setup here

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

export { app }; 