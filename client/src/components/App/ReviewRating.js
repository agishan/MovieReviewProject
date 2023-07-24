import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,Typography } from '@mui/material';

const ReviewRating = ({ onChange, error }) => {

  return (
    <div> 
    <FormControl component="fieldset">
      <FormLabel align="center" component="legend" sx={{ width:'75%'}} margin="normal">Select A Movie Rating</FormLabel>
      <RadioGroup onChange={onChange} row>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl>
    <Typography color="error">{error}</Typography>
  </div>  
    );
};

export default ReviewRating;