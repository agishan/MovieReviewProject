import React, { useState, useEffect} from 'react';
import Reviews from './Reviews';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Review = () => {
    return (
        
  <div>
    <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" style={{flexGrow: 1}}>
                  Movie Lover
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/Search">Search</Button>
              <Button color="inherit" component={Link} to="/MyPage">MyPage</Button>
          </Toolbar>
      </AppBar>
      <Reviews />
  </div>
    )
}  

export default Review;