import React, { useState } from 'react';
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

    const handleAdd = async () => {
        if (title.trim() !== '' && body.trim() !== '') {
            setAddingTask(true);
            try {
                const response = await axios.post('http://localhost:5000/todos', { title, body, completed: false });
                fetchTodos();
                setTitle('');
                setBody('');
                toast.success("Task added successfully!", { position: "top-center" });
            } catch (error) {
                console.error('Error adding todo', error);
            } finally {
                setAddingTask(false);
            }
        } else {
            toast.error("Please enter a title and body for the task!", { position: "top-center" });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            fetchTodos();
            toast.error("Task deleted successfully!", { position: "top-center" });
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    const handleEdit = (id, title, body) => {
        setEditTodoId(id);
        setTitle(title);
        setBody(body);
    };

    const handleUpdate = async (id, updatedTitle, updatedBody) => {
        if (updatedTitle.trim() !== '' && updatedBody.trim() !== '') {
            try {
                const response = await axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle, body: updatedBody, completed: todos.find(item => item._id === id).completed });
                fetchTodos();
                setEditTodoId(null);
                setTitle('');
                setBody('');
                toast.success("Task updated successfully!", { position: "top-center" });
            } catch (error) {
                console.error('Error updating todo', error);
            }
        } else {
            toast.error("Please enter a valid title and body for the task!", { position: "top-center" });
        }
    };

    const handleComplete = async (id) => {
        const todoToUpdate = todos.find(item => item._id === id);
        try {
            const response = await axios.put(`http://localhost:5000/todos/${id}`, { title: todoToUpdate.title, body: todoToUpdate.body, completed: !todoToUpdate.completed });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo', error);
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
                        className='mb-4'
                    />
                </div>
            </Paper>
            <Typography variant="h5" className='font-bold mb-3'>Tasks</Typography>
            <Grid container spacing={2}>
                {todos.map((item) => (
                    (!showCompleted || item.completed) &&
                    <Grid item xs={12} key={item._id}>
                        <Paper elevation={3} className='p-4 mb-2'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <Checkbox
                                        checked={item.completed}
                                        onChange={() => handleComplete(item._id)}
                                    />
                                    <span className={`ml-2 ${item.completed ? 'line-through' : ''}`}>{item.title}: {item.body}</span>
                                </div>
                                {editTodoId === item._id ? (
                                    <div className="flex flex-col space-y-3">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={title}
                                            placeholder="Title"
                                            onChange={(e) => setTitle(e.target.value)}
                                            className='mb-4'
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={body}
                                            placeholder="Body"
                                            multiline
                                            rows={4}
                                            onChange={(e) => setBody(e.target.value)}
                                            className='mb-2'
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className='text-white bg-blue-800 rounded-xl py-2 px-3 mx-1'
                                            onClick={() => handleUpdate(item._id, title, body)}
                                        >
                                            <FontAwesomeIcon icon={faSave} /> Update
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='flex gap-2'>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className='text-white bg-blue-800 rounded-xl py-2 px-3'
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className='text-white bg-blue-800 rounded-xl py-2 px-3'
                                            onClick={() => handleEdit(item._id, item.title, item.body)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Todo;

