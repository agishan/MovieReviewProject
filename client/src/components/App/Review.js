import React, { useState, useEffect} from 'react';
import { Grid, Button } from '@mui/material';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';


const GreenTypography = styled(Typography)({
  color: 'green',
});


const Review = () => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [displayedMovie, setDisplayedMovie] = useState('');
  const [displayedEnteredTitle, setDisplayedEnteredTitle] = useState('');
  const [displayedEnteredReview, setDisplayedEnteredReview] = useState('');
  const [displayedSelectedRating, setDisplayedSelectedRating] = useState('');

  const [ratingError, setRatingError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [movieError, setMovieError] = useState('');

  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(1);
  
  const serverURL = '';

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movie List: ", body);
    return body;
  }

  const loadMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }

  const callApiAddReview = async (reviewData) => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData)
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const addReview = (reviewData) => {
    callApiAddReview(reviewData)
      .then(res => {
        console.log("callApiAddReview returned: ", res);
      })
  };

  useEffect(() => {
    loadMovies();
  }, []); 
  
  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleReviewBodyChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedMovie === '') {
      setMovieError('Select your movie');
    } else {
      setMovieError('');
    }
  
    if (enteredTitle === '') {
      setTitleError('Enter your review title');
    } else {
      setTitleError('');
    }
  
    if (enteredReview === '') {
      setBodyError('Enter your review');
    } else {
      setBodyError('');
    }
  
    if (selectedRating === 0) {
      setRatingError('Select the rating');
    } else {
      setRatingError('');
    }
  
    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      setDisplayedMovie(selectedMovie);
      setDisplayedEnteredTitle(enteredTitle);
      setDisplayedSelectedRating(selectedRating);
      setDisplayedEnteredReview(enteredReview);
      setIsSubmitted(true);

      var reviewData = {
        movieID: selectedMovie.id,
        userId: userId,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
      };
  
      addReview(reviewData);
    }
  };
  

  return (
    <Grid container direction="column" alignItems="left" spacing={2}>
      
      <Grid item>
        <Typography variant="h3" align="center">Review A Movie</Typography>
      </Grid>

      <Grid item align="center">
        <MovieSelection 
          movies={movies} 
          selectedMovie={selectedMovie} 
          handleMovieChange={handleMovieChange} 
          movieError={movieError}
        />

        <ReviewTitle 
        onChange={handleTitleChange} 
        error={titleError}  
        />

        <ReviewBody 
        onChange={handleReviewBodyChange}
        error={bodyError}
        />

        <ReviewRating 
        onChange={handleRatingChange}  
        error={ratingError}
        />
      </Grid>
  
      <Grid item align="center">
        <Button 
        variant="contained" 
        color="primary"  
        sx={{ width: '75%' }} 
        margin="normal" 
        onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
  
      {isSubmitted && (
        <Grid align="center" item>
              <GreenTypography variant="h6">
                Your review has been received
              </GreenTypography>
  
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle1">Movie: {displayedMovie.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Title: {displayedEnteredTitle}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Body: {displayedEnteredReview}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Rating: {displayedSelectedRating}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}  

export default Review;