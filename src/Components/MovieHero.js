import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Rating } from '@mui/material';

export default function MovieHero(props) {
  const { backdrop, title, year, overview, rating, status } = props;
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop})`
      }}
    >
      <Box sx={{
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      }} />
      <Grid container style={{ backgroundColor: '#12234556', backdropFilter: 'blur(2px)' }}>
        <Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignContent: 'center', alignItems: 'center',
          minHeight: 300, my: 4
        }}>
          <Typography sx={{ textTransform: 'uppercase' }}
            fontFamily='Calibri' component="h1" variant="h3" align="center"
            color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant='h6'>
            {status} • {year}
          </Typography>
          <Rating sx={{ margin: 2 }} precision={0.5} value={rating} size="large" readOnly />
          <Typography align="center" paragraph mx={10}
            style={{ backgroundColor: '#12121266', borderRadius: 16, padding: 16 }}>
            {overview}
          </Typography>
        </Box>
      </Grid>
    </Paper>
  );
}