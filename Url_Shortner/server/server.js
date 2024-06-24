import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './conn/db.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/url', urlRoutes);

connectDB();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
