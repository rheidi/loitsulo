import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import darkTheme from './styling/darkTheme';
import AllSpells from './pages/AllSpells';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='spells' element={<AllSpells />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App
