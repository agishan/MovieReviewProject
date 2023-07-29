import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';

const MyPages = () => {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        fetch('/api/topMovies')
            .then(response => response.json())
            .then(data => setMovies(data));

        fetch('/api/topActors')
            .then(response => response.json())
            .then(data => setActors(data));

        fetch('/api/topDirectors')
            .then(response => response.json())
            .then(data => setDirectors(data));
    }, []);

    return (
        <Box style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
            <Typography variant="h4" align="center" style={{ color: 'gold' }}>Top 10 Movies</Typography>
            {movies.map((movie, index) => (
                <Paper key={index} elevation={3} style={{ backgroundColor: 'gold', marginBottom: '20px' }}>
                    <Box p={2}>
                        <Typography variant="h5" style={{ color: 'black' }}>{movie.movie_name}</Typography>
                        <Typography variant="body1" style={{ color: 'black' }}>Average Score: {movie.average_review_score}</Typography>
                    </Box>
                </Paper>
            ))}
            
            <Typography variant="h4" align="center" style={{ color: 'gold' }}>Top 10 Actors</Typography>
            {actors.map((actor, index) => (
                <Paper key={index} elevation={3} style={{ backgroundColor: 'gold', marginBottom: '20px' }}>
                    <Box p={2}>
                        <Typography variant="h5" style={{ color: 'black' }}>{actor.actor_name}</Typography>
                        <Typography variant="body1" style={{ color: 'black' }}>Average Score: {actor.average_review_score}</Typography>
                    </Box>
                </Paper>
            ))}

            <Typography variant="h4" align="center" style={{ color: 'gold' }}>Top 10 Directors</Typography>
            {directors.map((director, index) => (
                <Paper key={index} elevation={3} style={{ backgroundColor: 'gold', marginBottom: '20px' }}>
                    <Box p={2}>
                        <Typography variant="h5" style={{ color: 'black' }}>{director.director_name}</Typography>
                        <Typography variant="body1" style={{ color: 'black' }}>Average Score: {director.average_review_score}</Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default MyPages;
