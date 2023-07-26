import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Landing = () => {
    return (
        <>
        <AppBar position="static" color="inherit" style={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: 'gold' }}>
                    My App
                </Typography>
                <Button color="inherit" style={{ color: 'white' }}>Home</Button>
                <Button color="inherit" component={Link} to="/MyPage" style={{ color: 'gold' }}>MyPage</Button>
                <Button color="inherit" component={Link} to="/Review" style={{ color: 'gold' }}>Review</Button>
                <Button color="inherit" component={Link} to="/Search" style={{ color: 'gold' }}>Search</Button>
            </Toolbar>
        </AppBar>
      </>
    );
};

export default Landing;
