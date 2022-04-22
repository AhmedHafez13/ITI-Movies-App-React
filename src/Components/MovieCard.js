import { Box, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import { Card, Typography } from '@mui/material';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import RatingCirle from './RatingCircle';
import { Link } from 'react-router-dom';

// import moviePlaceholder from './images/moviePlaceholder.png'

function MovieCard(props) {
  const { id, title, overview, poster_path, vote_average } = props.movieData;

  let posterSrc = poster_path
    ? "https://image.tmdb.org/t/p/w500/" + poster_path
    : "/images/movie-placeholder.png";

  return (
    <div className="app-card">
      <Card elevation={0} className="hand-cursor">
        <Link to={"/movie/" + id}>
          <ImageListItem>
            <img className="scalable-image"
              height='100%'
              src={posterSrc}
              srcSet={posterSrc}
              alt={title}
              loading="lazy"
            />

            <ImageListItemBar position="top"
              title={<Typography sx={{ fontSize: '1rem' }}>{title}</Typography>}
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 110%)'
              }}
              actionPosition="left"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${title}`}>
                  <StarBorderIcon />
                </IconButton>
              }
            />

            <Box sx={{ position: 'absolute', top: 35, right: 5, zIndex: 1 }}>
              <RatingCirle rating={vote_average} />
            </Box>

            <Box className="card-desc"
              sx={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0, zIndex: 10 }}>
              <Typography textAlign='center' height='100%' fontSize={2}>{overview}</Typography>
            </Box>
          </ImageListItem>
        </Link>
      </Card>
    </div>
  );
}

export default MovieCard;