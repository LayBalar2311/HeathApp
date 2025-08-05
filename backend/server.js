import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './userRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://heath-app-livid.vercel.app',
  credentials: true
}));
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

// ✅ Render assigns a custom port, so bind to process.env.PORT
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ DB connection failed:", err);
});
