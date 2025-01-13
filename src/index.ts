import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', authRoutes);

mongoose
    .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authapp')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
            .on('error', (error) => {
                console.error('Server startup error:', error);
                process.exit(1);
            });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });