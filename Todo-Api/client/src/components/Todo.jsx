import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Container, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const Todo = ({ todos, showCompleted, fetchTodos }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addingTask, setAddingTask] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const getAuthToken = () => localStorage.getItem('token');

    const handleAdd = async () => {
        if (title.trim() !== '' && body.trim() !== '') {
            setAddingTask(true);
            try {
                setTimeout(async () => {
                    const response = await axios.post('http://localhost:5000/todos', 
                        { title, body, completed: false }, 
                        { 
                            headers: { 'Authorization': `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
                        }
                    );
                    fetchTodos();
                    setTitle('');
                    setBody('');
                    toast.success("Task added successfully!", { position: "top-center" });
                    setAddingTask(false);
                }, 3000);
            } catch (error) {
                console.error('Error adding todo', error);
                toast.error("Error adding task. Please try again.", { position: "top-center" });
                setAddingTask(false);
            }
        } else {
            toast.error("Please enter a title and body for the task!", { position: "top-center" });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`, { headers: { 'Authorization': `Bearer ${getAuthToken()}` } });
            fetchTodos();
            toast.error("Task deleted successfully!", { position: "top-center" });
        } catch (error) {
            console.error('Error deleting todo', error);
            toast.error("Error deleting task. Please try again.", { position: "top-center" });
        }
    };

    const handleEdit = (id, title, body) => {
        setEditTodoId(id);
        setTitle(title);
        setBody(body);
    };

    const handleUpdate = async (id) => {
        if (title.trim() !== '' && body.trim() !== '') {
            try {
                const todo = todos.find(item => item._id === id);
                const response = await axios.put(`http://localhost:5000/todos/${id}`, 
                    { title, body, completed: todo.completed }, 
                    { headers: { 'Authorization': `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' } }
                );
                fetchTodos();
                setEditTodoId(null);
                setTitle('');
                setBody('');
                toast.success("Task updated successfully!", { position: "top-center" });
            } catch (error) {
                console.error('Error updating todo', error);
                toast.error("Error updating task. Please try again.", { position: "top-center" });
            }
        } else {
            toast.error("Please enter a valid title and body for the task!", { position: "top-center" });
        }
    };

    const handleComplete = async (id) => {
        const todoToUpdate = todos.find(item => item._id === id);
        try {
            const response = await axios.put(`http://localhost:5000/todos/${id}`, 
                { title: todoToUpdate.title, body: todoToUpdate.body, completed: !todoToUpdate.completed }, 
                { headers: { 'Authorization': `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' } }
            );
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo', error);
            toast.error("Error updating task. Please try again.", { position: "top-center" });
        }
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md" className='my-5'>
            <ToastContainer position="top-center" />
            <Paper elevation={3} className='p-4 mb-4'>
                <div className="flex items-center justify-between mb-4">
                    <Typography variant="h5" className='font-bold'>Add Task</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className='text-white bg-blue-800 rounded-xl py-2 px-3'
                        onClick={handleAdd}
                        disabled={addingTask}
                    >
                        {addingTask ? <FontAwesomeIcon icon={faSpinner} spin /> : <><FontAwesomeIcon icon={faPlus} /> Add</>}
                    </Button>
                </div>
                <div className="flex flex-col space-y-3">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='mb-2'
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Body"
                        multiline
                        rows={4}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
            </Paper>
            <Typography variant="h5" className='font-bold mb-3'>Tasks</Typography>
            <Grid container spacing={2}>
                {todos.map(todo => (
                    <Grid item xs={12} key={todo._id}>
                        {(showCompleted && todo.completed) || (!showCompleted && !todo.completed) ? (
                            <Paper elevation={3} className='p-3'>
                                <div className="flex justify-between items-center mb-2">
                                    <Typography variant="h6" className={`font-bold ${todo.completed ? 'line-through' : ''}`}>{todo.title}</Typography>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={todo.completed}
                                            onChange={() => handleComplete(todo._id)}
                                            color="primary"
                                        />
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="cursor-pointer"
                                            onClick={() => handleEdit(todo._id, todo.title, todo.body)}
                                        />
                                        <label>Edit</label>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="cursor-pointer text-red-600"
                                            onClick={() => handleDelete(todo._id)}
                                        />
                                        <label>Delete</label>
                                    </div>
                                </div>
                                <Typography variant="body1" className={todo.completed ? 'line-through' : ''}>{todo.body}</Typography>
                                {editTodoId === todo._id && (
                                    <div className="flex flex-col space-y-3 mt-3">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Update Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className='mb-2'
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Update Body"
                                            multiline
                                            rows={4}
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className='text-white bg-green-700 rounded-xl py-2 px-3'
                                            onClick={() => handleUpdate(todo._id)}
                                        >
                                            <FontAwesomeIcon icon={faSave} /> Update
                                        </Button>
                                    </div>
                                )}
                            </Paper>
                        ) : null}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Todo;
