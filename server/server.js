import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from './prisma.js';

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.get('/api/courts', async (req, res) => {
    const { city } = req.query;
    try {
        const courts = await prisma.court.findMany({
            where: city ? { city } : {}
        });
        res.json(courts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch courts' });
    }
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});