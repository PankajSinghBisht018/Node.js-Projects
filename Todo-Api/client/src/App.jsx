import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './components/Todo';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [showCompleted, setShowCompleted] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTodos();
        }
    }, [isAuthenticated]);

    const getAuthToken = () => localStorage.getItem('token');

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const toggleCompleted = () => {
        setShowCompleted(prev => !prev);
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos',  { headers: { 'Authorization': `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' } })
                ;
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            {isAuthenticated ? (
                <div>
                    <Navbar toggleCompleted={toggleCompleted} onLogout={handleLogout} showCompleted={showCompleted} />
                    <Todo todos={todos} showCompleted={showCompleted} fetchTodos={fetchTodos} />
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;