import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import './App.css';

import Header from './Components/Header';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/favourites' element={<Favourites />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
