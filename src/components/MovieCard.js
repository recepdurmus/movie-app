import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import AuthContext from "../context/AuthContext"

const MovieCard = ({title, poster_path, overview, vote_average}) => {

  // const{currentUser} = useContext(AuthContext)

const IMG_API = 'https://image.tmdb.org/t/p/w1280'
const defaultImage = "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"



  return (
    <Card sx={{ maxWidth: 245, margin:'1rem' }}>
      <CardMedia
        component="img"
        alt={title}
        image={ poster_path ?  IMG_API + poster_path : defaultImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard