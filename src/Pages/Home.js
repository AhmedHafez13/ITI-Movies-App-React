import { useEffect, useState } from 'react';

import { Pagination, Box } from '@mui/material';

import PageHero from '../Components/PageHero';
import MovieApi from '../Api/MovieApi';
import MoviesGrid from '../Components/MoviesGrid';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    MovieApi.get(`discover/movie?page=${pageNumber}&with_genres=16`)
      .then(response => {
        // console.log(response.data.results);
        setMovies(response.data.results);

        if (movies)
          window.scrollTo({ top: 200 });
      })
      .catch(error => console.log(error));
  }, [pageNumber]);

  return (
    <main>
      <PageHero />

      <MoviesGrid movies={movies} />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }} >
        <Pagination count={500} variant="outlined" color="primary"
          onChange={(_, page) => { setPageNumber(page) }} />
      </Box>
    </main>
  );
}