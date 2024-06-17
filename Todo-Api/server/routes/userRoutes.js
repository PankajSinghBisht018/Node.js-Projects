const express = require('express');
const User = require('../model/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'helloworld'; 

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashpassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, password: hashpassword });
        await user.save();
        res.status(201).json({ message: 'Signup success' });
    } catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Signup first' });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router;
