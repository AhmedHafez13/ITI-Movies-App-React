import { useEffect, useState } from 'react';

import { Grid, Container, Pagination, Box } from '@mui/material';

import MovieCard from '../Components/MovieCard';
import PageHero from '../Components/PageHero';
import MovieApi from '../Api/MovieApi';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // MovieApi.get("movie/top_rated")
    MovieApi.get(`discover/movie?page=${pageNumber}&with_genres=16`)
      .then(response => {
        console.log(response.data.results);
        setMovies(response.data.results);

        if (movies)
          window.scrollTo({ top: 200, behavior: 'smooth' });
      })
      .catch(error => console.log(error));
  }, [pageNumber]);

  return (
    <main>
      <PageHero />

      <Container sx={{ py: 2 }} >
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={4} md={3}>
              <MovieCard movieData={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }} >
        <Pagination count={500} variant="outlined" color="primary"
          onChange={(_, page) => {
            setPageNumber(page);
          }} />
      </Box>
    </main>
  );
}