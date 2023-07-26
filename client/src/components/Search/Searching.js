import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';

const Search = () => {
    const [movieName, setMovieName] = useState('');
    const [directorName, setDirectorName] = useState('');
    const [actorName, setActorName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        let searchParams = {
            movieName,
            directorName,
            actorName,
        };

        fetch('/api/searchMovies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchResults(data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Container maxWidth="md">
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center" gutterBottom>
                        Search
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        Search for reviews!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Movie Name" 
                        fullWidth 
                        onChange={(e) => setMovieName(e.target.value)} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Director Name" 
                        fullWidth 
                        onChange={(e) => setDirectorName(e.target.value)} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Actor Name" 
                        fullWidth 
                        onChange={(e) => setActorName(e.target.value)} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth 
                        onClick={handleSearch}
                        style={{ backgroundColor: 'black', color: 'gold' }}  
                    >
                        Search
                    </Button>
                </Grid>
                {searchResults.length > 0 && searchResults.map((result, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper elevation={3}>
                            <Box p={3}>
                                <Typography variant="h5" gutterBottom>
                                    {result.movie_name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Directed by: {result.directors}
                                </Typography>
                                {result.review_contents && (
                                    <div>
                                        <Typography variant="subtitle1">Reviews:</Typography>
                                                {result.review_contents.split('||').map((review) => (
                                                    <li>{review}</li>
                                                ))}
                                    </div>
                                )}
                                {result.average_review_score && <Typography variant="subtitle1" gutterBottom>Score: {result.average_review_score}</Typography>}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Search;
