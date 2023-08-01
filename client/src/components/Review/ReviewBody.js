import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ReviewBody = ({ onChange, error }) => {

  return (
    <div>
      <TextField
        label="Enter The Contents Of Your Review!"
        variant="filled"
        notched={false}
        margin="normal"
        
        multiline
        onChange={onChange}
        InputLabelProps={{
          style: { color: 'gold' },
      }}
      InputProps={{
          style: { color: 'white', borderColor: 'white', borderWidth: 1, borderStyle: 'solid' }, maxLength: 200
      }} 
        sx={{ width: '75%' }}
      />
      <Typography color="error">{error}</Typography>
    </div>
  );
  
};

export default ReviewBody;