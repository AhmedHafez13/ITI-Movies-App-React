import { useEffect, useState } from 'react';
import {
  Box, Container, FormControl, OutlinedInput, Typography
} from '@mui/material';

import LoadingIndicator from '../Components/LoadingIndicator';
import MoviesGrid from '../Components/MoviesGrid';
import PageHero from '../Components/PageHero';
import MovieApi from '../Api/MovieApi';

import { useNavigate } from 'react-router-dom';

import useQuery from '../CustomHooks/UseQuery'

// Used to delay for some time before making request
let searchDelayInterval = null;

export default function Search(props, ss) {
  const [isLoading, setisLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const query = useQuery();
  const initialQuery = query.get("query");

  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery)
  }, []);

  useEffect(() => {
    if (searchQuery) setisLoading(true);
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
                value={initialQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  navigate("/search?query=" + event.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Container>
      </Box>

      {isLoading
        ? <LoadingIndicator />
        :
        <>
          {searchQuery.length > 0 && movies.length === 0
            ? <PageHero title="Can't find anything 😢" />
            : <MoviesGrid movies={movies} />
          }
        </>
      }
    </>
  );
}