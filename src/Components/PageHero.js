import { Box, Typography, Container } from '@mui/material';

function PageHero(props) {
  const title = props.title|| '';
  const desc = props.desc || '';
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 4, pb: 3 }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2"
          align="center" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {desc}
        </Typography>
      </Container>
    </Box>
  );
}

export default PageHero;