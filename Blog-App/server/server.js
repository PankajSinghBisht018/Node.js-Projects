const express = require('express');
const connectDB = require('./db/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT =  5000;

app.use(cors()); 
app.use(bodyParser.json());


connectDB();

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
