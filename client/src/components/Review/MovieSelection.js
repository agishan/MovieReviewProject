import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)({
  marginBottom: '20px'
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: '16px', 
  fontWeight: 'bold'
});

const StyledSelect = styled(Select)({
  minWidth: '250px'
});

const MovieSelection = ({ movies, selectedMovie, handleMovieChange, movieError }) => {
  return (
    <div>
      <StyledFormControl variant="standard" sx={{ width: '50%' }}>
        <StyledInputLabel>Select A Movie To Review</StyledInputLabel>
        <StyledSelect value={selectedMovie} onChange={handleMovieChange}>
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie}>
              {movie.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
      <Typography color="error">{movieError}</Typography>
    </div>
  );
}

export default MovieSelection;