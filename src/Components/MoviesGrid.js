import { Container, Grid } from '@mui/material';

import MovieCard from './MovieCard';

export default function MoviesGrid({ movies }) {
  return (
    <Container sx={{ py: 2 }} >
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={4} md={3}>
            <MovieCard movieData={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

