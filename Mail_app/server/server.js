const express = require('express');
const cors = require('cors');
const connectDB = require('./conn/db');
const emailRoutes = require('./routes/emailRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
