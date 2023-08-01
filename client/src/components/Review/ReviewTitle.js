import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const ReviewTitle = ({onChange,error}) => {
  return (
    <div>
    <TextField
      label="Enter The Title Of Your Review"
      variant="filled"
      margin="normal"
      sx={{ width: '75%' }}
      InputLabelProps={{
        style: { color: 'gold' },
    }}
    InputProps={{
        style: { color: 'white', borderColor: 'white', borderWidth: 1, borderStyle: 'solid' },
    }} 
      onChange={onChange}
    />
    <Typography color="error">{error}</Typography>
    </div>
  );
};

export default ReviewTitle;