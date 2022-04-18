import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@mui/material';
import { MovieCreation } from '@mui/icons-material';

function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar variant="dense"
        sx={{ backdropFilter: 'blur(20px)', bgcolor: '#0a192956' }}>
        <MovieCreation sx={{ mr: 2 }} />
        <Link to='/'>
          <Typography variant="h6" color="inherit" noWrap>
            Amination Movies
          </Typography>
        </Link>
        <Link to='/favourites' style={{marginLeft: '1rem'}}>Favourites</Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;