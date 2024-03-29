import React from 'react';
import Reviews from './Reviews';
import { AppBar, Toolbar, Typography, Button, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Review = () => {
    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'black', color: 'gold' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'gold' }}>
            🎬 My Movie Website 🎥
          </Typography>
          <Button color="inherit" component={Link} to="/" style={{ color: 'gold' }}>Home</Button>
          <Button color="inherit" component={Link} to="/MyPage" style={{ color: 'gold' }}>MyPage</Button>
          <Button color="inherit" style={{ color: 'white' }}>Review</Button>
          <Button color="inherit" component={Link} to="/Search" style={{ color: 'gold' }}>Search</Button>
        </Toolbar>
      </AppBar>
      <div style={{ borderTop: '2px solid gold' }}></div>
      <Reviews />
    </div>
    )
}  

export default Review;
