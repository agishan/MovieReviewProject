import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Paper } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Searching from "./Searching";

const Search = () => {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'black', borderBottom: '2px solid gold' }}>
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
      <Searching />
    </div>
  );
};

export default Search;
