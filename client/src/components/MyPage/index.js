import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Paper } from '@mui/material';
import MyPages from './MyPages'
import ToWatchList from "./ToWatchList";

const MyPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'black', color: 'white' }}>
      <AppBar position="static" color="inherit" style={{ backgroundColor: 'black' }}>
          <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1, color: 'gold' }}>
                    🎬 My Movie Website 🎥
              </Typography>
              <Button color="inherit" component={Link} to="/" style={{ color: 'gold' }}>Home</Button>
              <Button color="inherit" style={{ color: 'white' }}>MyPage</Button>
              <Button color="inherit" component={Link} to="/Review" style={{ color: 'gold' }}>Review</Button>
              <Button color="inherit" component={Link} to="/Search" style={{ color: 'gold' }}>Search</Button>
          </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={3} style={{ backgroundColor: 'black', margin: '40px 220px', padding: '20px' }}>
              <ToWatchList/>
          </Paper>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={3} style={{ backgroundColor: 'black', margin: '40px 220px', padding: '20px' }}>
              <MyPages />
          </Paper>
      </Box>
    </Box>
  );
};

export default MyPage;
