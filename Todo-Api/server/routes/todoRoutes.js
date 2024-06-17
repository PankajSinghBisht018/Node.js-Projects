const express = require('express');
const Todo = require('../model/todo');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, body, completed } = req.body;
        const newTodo = new Todo({
            title,
            body,
            completed,
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, body, completed }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid ObjectId' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid ObjectId' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;