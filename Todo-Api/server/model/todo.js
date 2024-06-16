const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    body: String,
    completed: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);
