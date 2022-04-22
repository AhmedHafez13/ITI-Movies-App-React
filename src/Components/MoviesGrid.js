import { Container, Grid } from '@mui/material';

import Page from 'react-page-loading'

import MovieCard from './MovieCard';

export default function MoviesGrid({ movies }) {
  return (
    <Page loader={"bar"} color={"#A9A9A9"} size={4}>
      <Container sx={{ py: 2 }} >
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={4} md={3}>
              <MovieCard movieData={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

