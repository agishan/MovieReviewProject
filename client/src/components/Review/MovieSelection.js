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
       <FormControl 
      variant="filled" 
      sx={{ 
        width: '50%', 
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
      }}
    >
      <InputLabel sx={{ color: 'gold', '&.Mui-focused': { color: 'gold' } }}>
        Select A Movie To Review
      </InputLabel>
      <Select 
        value={selectedMovie} 
        onChange={handleMovieChange}
        sx={{ 
          '&:before': { borderColor: 'white' },
          '&:after': { borderColor: 'white' },
          color: 'white'
        }}
      >
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      <Typography color="error">{movieError}</Typography>
    </div>
  );
}

export default MovieSelection;