import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from './routes/user.route.js'


const app = express();

dotenv.config();

app.use(bodyParser.json())
app.use(cors({
    origin: 'https://lulinibank.vercel.app', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', userRoutes);

// app.get('/', (req, res) => {
//     res.send("Helloooo")
// });


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log("Listening on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });