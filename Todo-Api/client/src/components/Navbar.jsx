import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleCompleted, onLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo App
                </Typography>
                <Button color="inherit" onClick={toggleCompleted}>Toggle Completed</Button>
                <IconButton color="inherit" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
