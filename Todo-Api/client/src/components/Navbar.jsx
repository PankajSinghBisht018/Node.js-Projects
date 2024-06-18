import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleCompleted, onLogout, showCompleted }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo App
                </Typography>
                <Button 
                    onClick={toggleCompleted}
                    style={{ backgroundColor: showCompleted ? 'white' : 'yellow', color: 'black' }}
                >
                    {showCompleted ? 'Incomplete Tasks' : 'Completed Tasks'}
                </Button>
                <IconButton color="inherit" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
