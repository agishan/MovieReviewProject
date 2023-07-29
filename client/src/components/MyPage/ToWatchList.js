import React, { useState, useEffect } from 'react';
import { List, Grid, ListItem, ListItemText, Button, TextField, Paper, Typography, Select, MenuItem, InputLabel } from '@mui/material';

const ToWatchList = () => {
    const [toWatchList, setToWatchList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [userID, setUserID] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    const updateWatchList = async () => {
        try {
            const response = await fetch('/api/viewWatchList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID }),
            });
            const watchListData = await response.json();
            setToWatchList(watchListData);
        } catch (error) {
            console.error('There was an error retrieving the watch list!', error);
        }
    }

    const callApiGetMovies = async () => {
        const response = await fetch("/api/getMovies", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const loadMovies = async () => {
        try {
            const res = await callApiGetMovies();
            const parsed = JSON.parse(res.express);
            setMovies(parsed);
        } catch (error) {
            console.error('There was an error retrieving the movie list!', error);
        }
    }

    useEffect(() => {
        loadMovies();
        updateWatchList();
    }, [userID]);

    const handleAddMovie = async () => {
        setErrorMessage('');
        if (selectedMovie) {
            if (toWatchList.some((movie) => movie.id === selectedMovie.id)) {
                setErrorMessage('This movie is already in your watch list!');
                return;
            }

            try {
                await fetch('/api/addToWatchList', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userID, movieID: selectedMovie.id }),
                });
                setToWatchList([...toWatchList, selectedMovie]);
                setSelectedMovie(null);
            } catch (error) {
                console.error('There was an error adding the movie!', error);
            }
        }
    };

    const handleDeleteMovie = async (movieID) => {
        try {
            await fetch('/api/deleteFromWatchList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID, movieID }),
            });
            updateWatchList();
        } catch (error) {
            console.error('There was an error deleting the movie!', error);
        }
    };

    const MovieListItem = ({ movie, index }) => (
        <ListItem key={index}>
            <ListItemText primary={movie.name} style={{ color: 'gold' }} />
            <Button 
                variant="contained"
                onClick={() => handleDeleteMovie(movie.id)}
                style={{ marginLeft: '10px', backgroundColor: 'gold', color: 'black' }}
            >
                Delete
            </Button>
        </ListItem>
    );

    return (
        <Paper style={{ backgroundColor: 'black', color: 'white', marginBottom: '20px', marginTop: '20px' }}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ color: 'gold' }}>To Watch List</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" style={{ color: 'gold' }}>Add a Movie</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Select 
                        labelId="movie-select-label" 
                        id="movie-select" 
                        value={selectedMovie} 
                        onChange={(e) => setSelectedMovie(e.target.value)}
                        style={{ width: '350px', backgroundColor: 'gold' }} 
                    >
                        {movies.map((movie) => (
                            <MenuItem key={movie.id} value={movie}> 
                              {movie.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        onClick={handleAddMovie} 
                        style={{ backgroundColor: 'gold', color: 'black' }}
                    >
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" style={{ color: 'red' }}>{errorMessage}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        {toWatchList.map((movie, index) => <MovieListItem key={index} movie={movie} />)}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ToWatchList;