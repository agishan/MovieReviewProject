import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Search = () => {
  return (
    <div>
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" style={{flexGrow: 1}}>
                  My App
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/MyPage">MyPage</Button>
              <Button color="inherit" component={Link} to="/Review">Review</Button>
          </Toolbar>
      </AppBar>
      <h1>Search</h1>
    </div>
  );
};

export default Search;