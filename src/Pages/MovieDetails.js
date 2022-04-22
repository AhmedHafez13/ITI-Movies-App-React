import {
  Card, Chip, Grid, Typography, Container
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieApi from "../Api/MovieApi";
import HorizontalCardList from "../Components/HorizontalCardList";
import LoadingIndicator from "../Components/LoadingIndicator";
import MovieHero from "../Components/MovieHero";

function MovieDetails() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isRecomLoading, setRecomIsLoading] = useState(true);

  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState({});
  const [recommendations, setRecommendations] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    getMovies();
    getRecommendations();
  }, [pathname]);

  const getMovies = async () => {
    setIsLoading(true);
    MovieApi.get(`movie/${id}`)
      .then(response => {
        console.log('Details', response.data);
        setDetails(response.data);

        MovieApi.get(`movie/${id}/credits`)
          .then(response => {
            console.log('Credits', response.data);
            setCredits(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getRecommendations = async () => {
    setRecomIsLoading(true);
    MovieApi.get(`movie/${id}/recommendations`)
      .then(response => {
        setRecommendations(response.data.results.filter(
          movie => movie.genre_ids.includes(16))
        );
        setRecomIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setRecomIsLoading(false);
      });
  }

  return (
    <>
      {isLoading
        ?
        <LoadingIndicator />
        :
        <>
          <MovieHero title={details.title}
            backdrop={details.backdrop_path}
            overview={details.overview}
            status={details.status}
            rating={details.vote_average * 5 / 10}
            year={details.release_date.split('-')[0]} />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={5} md={4}>
              {/* <Card sx={{ borderRadius: 4, margin: 3, height: 'auto' }}> */}
              <div className="app-card" style={{ margin: 24 }}>
                <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  height='100%' width='100%' alt="Movie Poster" />
              </div>
              {/* </Card> */}
            </Grid>

            <Grid item xs={12} sm={7} md={8}>
              <Container sx={{ my: 4, px: 3 }}>
                <Typography variant='h5' marginBottom={2}>{details.title}</Typography>
                <Typography marginBottom={2}>
                  {details.release_date.split('-')[0]} • {details.production_countries[0].name}
                </Typography>

                {details.genres.map(genre =>
                  <Chip key={genre.id} sx={{ mx: '0.2rem' }} label={genre.name} color="primary" variant="outlined" />
                )}

                <Typography variant='h6' marginTop={3}>Overview</Typography>
                <Typography marginY={1}>{details.overview}</Typography>

                <Typography variant='h6' marginTop={3}>Top Cast</Typography>
                <HorizontalCardList items={
                  credits.cast
                    .filter(cast => cast.known_for_department === "Acting" && cast.profile_path)
                    .map(cast => ({
                      id: cast.id,
                      title: cast.name,
                      subtitle: `as ${cast.character}`,
                      image: cast.profile_path
                    }))
                } />
              </Container>
            </Grid>
          </Grid>

          {isRecomLoading
            ?
            <LoadingIndicator />
            :
            <>
              {recommendations.length > 0 &&
                <Container sx={{ px: 4 }}>
                  <Typography variant='h6' marginTop={3}>Recommendations</Typography>
                  <HorizontalCardList
                    cardWidth={200}
                    imgHight={280}
                    items={
                      recommendations
                        .map(movie => ({
                          id: movie.id,
                          title: movie.title,
                          image: movie.poster_path,
                          link: `/movie/${movie.id}`
                        }))
                    }
                  />
                </Container>
              }
            </>
          }
        </>
      }
    </>
  );
}

export default MovieDetails;