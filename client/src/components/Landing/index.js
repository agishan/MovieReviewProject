import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Landing = () => {
    return (
        <>
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" style={{flexGrow: 1}}>
                  Movie Lover
              </Typography>
              <Button color="inherit" component={Link} to="/Search">Search</Button>
              <Button color="inherit" component={Link} to="/MyPage">MyPage</Button>
              <Button color="inherit" component={Link} to="/Review">Review</Button>
          </Toolbar>
      </AppBar>
      </>
    );
};

export default Landing;
