import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Copyright from './Copyright';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Animation Movies App
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        This website is developed by (Eng Ahmed Hafez) using IEBD API V3
      </Typography>
      <Copyright />
    </Box>
  );
}

export default Footer;