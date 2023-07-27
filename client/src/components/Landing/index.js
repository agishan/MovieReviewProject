import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import GoodWillHunting from './Assets/GoodWillHunting.jpg';
import MonstersInc from './Assets/MonstersInc.jpg';
import Scarface from './Assets/ScarfacePoster.jpg';

const Landing = () => {
    return (
        <>
            <AppBar position="static" color="inherit" style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h5" style={{ flexGrow: 1, color: 'gold', fontSize: '24px' }}>
                        🎬 My Movie Website 🎥
                    </Typography>
                    <Button color="inherit" style={{ color: 'gold', fontSize: '18px' }}>Home</Button>
                    <Button color="inherit" component={Link} to="/MyPage" style={{ color: 'gold', fontSize: '18px' }}>MyPage</Button>
                    <Button color="inherit" component={Link} to="/Review" style={{ color: 'gold', fontSize: '18px' }}>Review</Button>
                    <Button color="inherit" component={Link} to="/Search" style={{ color: 'gold', fontSize: '18px' }}>Search</Button>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: '30px' }}>
                <Typography variant="h3" align="center" gutterBottom style={{ color: 'gold' }}>
                    Welcome to My Movie Website!
                </Typography>
                <Typography variant="h5" align="center" gutterBottom style={{ color: 'black' }}>
                    Discover your favorite movies, write reviews, and explore a vast collection of movie posters.
                </Typography>

                {/* Add images of movie posters */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <img src={GoodWillHunting} alt="Good Will Hunting" style={{ width: '200px', margin: '10px', borderRadius: '5px' }} />
                    <img src={MonstersInc} alt="Monsters Inc" style={{ width: '200px', margin: '10px', borderRadius: '5px' }} />
                    <img src={Scarface} alt="Scarface" style={{ width: '200px', margin: '10px', borderRadius: '5px' }} />
                </div>

                <Typography variant="h5" align="center" style={{ marginTop: '20px', fontWeight: 'bold', color: 'gold' }}>
                    Enjoy your movie journey with us! 🍿🎉
                </Typography>
            </Container>
        </>
    );
};

export default Landing;
