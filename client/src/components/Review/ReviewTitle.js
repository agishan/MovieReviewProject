import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const ReviewTitle = ({onChange,error}) => {
  return (
    <div>
    <TextField
      label="Enter The Title Of Your Review"
      variant="outlined"
      margin="normal"
      sx={{ width: '75%' }}
      onChange={onChange}
    />
    <Typography color="error">{error}</Typography>
    </div>
  );
};

export default ReviewTitle;