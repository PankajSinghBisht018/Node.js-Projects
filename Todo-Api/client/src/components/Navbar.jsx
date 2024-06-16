import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const MyAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5', 
});

const useStyles = () => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  button: {
    backgroundColor: '#2196f3', 
    '&:hover': {
      backgroundColor: '#1e88e5',
    },
    color: 'white',
    borderRadius: '20px',
    padding: '10px 20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
});

const Navbar = ({ toggleCompleted }) => {
  const classes = useStyles();

  return (
    <MyAppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Todo-List
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Button className={classes.button} onClick={toggleCompleted} variant='contained'>
          Completed Task
        </Button>
      </Toolbar>
    </MyAppBar>
  );
};

export default Navbar;
