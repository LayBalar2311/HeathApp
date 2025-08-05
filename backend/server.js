import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// ✅ Enable CORS (for frontend API access)
app.use(cors({
  origin: 'https://your-frontend.vercel.app', // Replace with your actual frontend URL
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());

// ✅ Routes (your existing)
import userRoutes from './userRoutes.js'; // example
app.use('/api/users', userRoutes);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ DB + Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error(err));
