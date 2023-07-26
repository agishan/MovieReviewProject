import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

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
                console.log(data)
                setSearchResults(data)})
            .catch((error) => console.error(error));
    };

    return (
        <Container maxWidth="md" style={{ width: '75%', margin: '0 auto' }}>
            <Grid container direction="column" justify="center" spacing={3} style={{ minHeight: '100vh' }}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
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
                        style={{ backgroundColor: 'black', color: 'gold' }}
                        fullWidth 
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
                    {searchResults.length > 0 && searchResults.map((result, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="h5">
                                {result.movie_name}
                            </Typography>
                            <p>Directed by: {result.directors}</p>
                            {result.review_contents && <p>Reviews: {result.review_contents}</p>}
                            {result.average_review_score && <p>Score: {result.average_review_score}</p>}
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
    
    };
    

export default Search;
