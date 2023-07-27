import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Searching from './Searching'

const Search = () => {
  return (
    <div>
        <AppBar position="static" color="inherit" style={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: 'gold' }}>
                    🎬 My Movie Website 🎥
                </Typography>
                <Button color="inherit" component={Link} to="/" style={{ color: 'gold' }}>Home</Button>
                <Button color="inherit" component={Link} to="/MyPage" style={{ color: 'gold' }}>MyPage</Button>
                <Button color="inherit" component={Link} to="/Review" style={{ color: 'gold' }}>Review</Button>
                <Button color="inherit" style={{ color: 'white' }}>Search</Button>
            </Toolbar>
        </AppBar>

      <h1>
      
      </h1>
      <Searching/>
    </div>

  );
};

export default Search;