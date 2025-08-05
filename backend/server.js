// /backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js'; // adjust as needed
import userRoutes from './userRoutes.js'; // your API routes
import prakritiRoutes from './prakritiRoutes.js';


dotenv.config(); // load .env
connectDB();     // connect to Atlas

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/prakriti', prakritiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
