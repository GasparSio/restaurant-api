import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5001;

// app.use("/api/auth", authRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
    res.send('Restaurant API funcionando 🚀')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})