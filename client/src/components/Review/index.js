import React, { useState, useEffect} from 'react';
import Reviews from './Reviews';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Review = () => {
    return (
        
  <div>
        <AppBar position="static" color="inherit" style={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: 'gold' }}>
                    My App
                </Typography>
                <Button color="inherit" component={Link} to="/" style={{ color: 'gold' }}>Home</Button>
                <Button color="inherit" component={Link} to="/MyPage" style={{ color: 'gold' }}>MyPage</Button>
                <Button color="inherit" style={{ color: 'white' }}>Review</Button>
                <Button color="inherit" component={Link} to="/Search" style={{ color: 'gold' }}>Search</Button>
            </Toolbar>
        </AppBar>
      <Reviews />
  </div>
    )
}  

export default Review;