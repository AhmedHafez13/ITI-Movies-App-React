import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import {
  Box, Container, FormControl, OutlinedInput, Typography
} from '@mui/material';

import useQuery from '../CustomHooks/UseQuery'

import LoadingIndicator from '../Components/LoadingIndicator';
import MoviesGrid from '../Components/MoviesGrid';
import PageHero from '../Components/PageHero';
import MovieApi from '../Api/MovieApi';

// Used to delay for some time before making request
let searchDelayInterval = null;

export default function Search(props, ss) {
  const [isLoading, setisLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const query = useQuery();

  useEffect(() => {
    setSearchQuery(query.get("query") || "")
  }, [searchParams]);

  useEffect(() => {
    setisLoading(searchQuery ? true : false);

    clearInterval(searchDelayInterval);
    if (searchQuery) {
      searchDelayInterval = setTimeout(() => {
        getMovies();
      }, 1000);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const getMovies = async () => {
    if (searchQuery && searchQuery.length > 0) {
      MovieApi.get(`search/movie?query=${searchQuery}`)
        .then(response => {
          console.log(response.data.results.filter(movie => movie.genre_ids.includes(16)));
          setMovies(response.data.results.filter(movie => movie.genre_ids.includes(16)));
          setisLoading(false);
        })
        .catch(error => {
          console.log(error)
          setisLoading(false);
        });
    } else {
      setisLoading(false);
    }
  }

  const updateUrlQuery = (newQuery) => {
    searchParams.set('query', newQuery);
    setSearchParams(searchParams)
  }

  return (
    <>
      <Box sx={{
        my: 4, display: 'flex', flexDirection: 'column',
        alignContent: 'center', justifyContent: 'center'
      }}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" mb={3}
            align="center" color="text.primary" gutterBottom>
            Search for a Movie
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ textAlign: 'center' }}>
            <FormControl sx={{ width: 500 }}>
              <OutlinedInput
                placeholder="Enter a movie title"
                className="text-center"
                value={searchQuery}
                onChange={(event) => { updateUrlQuery(event.target.value) }}
              />
            </FormControl>
          </Box>
        </Container>
      </Box>

      {isLoading
        ? <LoadingIndicator />
        :
        <>
          {searchQuery && searchQuery.length > 0 && movies.length === 0
            ? <PageHero title="Can't find anything 😢" />
            : <MoviesGrid movies={movies} />
          }
        </>
      }
    </>
  );
}