import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ title, poster_path, overview, vote_average }) => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const setVoteClass = (vote) => {
    if(vote>=8){
        return '#dcedc8'
    }else if(vote>=6){
        return '#ffe0b2'
    }else{
        return '#ffcdd2'
    }
}


  return (
    <Card sx={{ maxWidth: 245, margin: "1rem", minHeight: 500 }}>
      <CardMedia
        component="img"
        height="380"
        image={poster_path ? IMG_API + poster_path : defaultImage}
        alt={title}
      />
      <CardContent>
        <Box
          component="div"
          sx={{

            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {overview}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {currentUser?(<IconButton style={{backgroundColor:`${setVoteClass(vote_average)}`, width:'50px'}} aria-label="add to favorites">{vote_average}</IconButton>):(null)}
        

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{overview}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MovieCard;
