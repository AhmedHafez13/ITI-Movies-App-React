import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import { Pagination, Box } from '@mui/material';

import useQuery from '../CustomHooks/UseQuery'

import PageHero from '../Components/PageHero';
import MovieApi from '../Api/MovieApi';
import MoviesGrid from '../Components/MoviesGrid';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  const query = useQuery();
  let initialPageNumber = +query.get("page") ? +query.get("page") : 1;

  useEffect(() => {
    setPageNumber(initialPageNumber)
  }, []);

  useEffect(() => {
    searchParams.set('page', pageNumber);
    setSearchParams(searchParams)

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
      <PageHero title="Animation Movies"
        desc="Makes it easy to find and enjoy the entertainment you love in one place..." />

      <MoviesGrid movies={movies} />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }} >
        <Pagination count={500} variant="outlined" color="primary" page={initialPageNumber}
          onChange={(_, page) => { setPageNumber(page) }} />
      </Box>
    </main >
  );
}