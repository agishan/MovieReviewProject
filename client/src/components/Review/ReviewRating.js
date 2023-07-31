import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,Typography } from '@mui/material';

const ReviewRating = ({ onChange, error }) => {

  return (
    <div> 
    <FormControl component="fieldset">
      <FormLabel 
        align="center" 
        component="legend" 
        sx={{ width:'75%', color: 'gold' }} 
        margin="normal"
      >
        Select A Movie Rating
      </FormLabel>
      <RadioGroup onChange={onChange} row>
      <FormControlLabel value="1" control={<Radio sx={{color: 'gold'}} />} label={<span style={{color: 'gold'}}>1</span>} />
        <FormControlLabel value="2" control={<Radio sx={{color: 'gold'}} />} label={<span style={{color: 'gold'}}>2</span>} />
        <FormControlLabel value="3" control={<Radio sx={{color: 'gold'}} />} label={<span style={{color: 'gold'}}>3</span>} />
        <FormControlLabel value="4" control={<Radio sx={{color: 'gold'}} />} label={<span style={{color: 'gold'}}>4</span>} />
        <FormControlLabel value="5" control={<Radio sx={{color: 'gold'}} />} label={<span style={{color: 'gold'}}>5</span>} />
      </RadioGroup>
    </FormControl>
    <Typography color="error">{error}</Typography>
  </div>  
    );
};

export default ReviewRating;