import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import darkTheme from './styling/darkTheme';
import AllSpells from './pages/AllSpells';
import MySpells from './pages/MySpells';
import { SpellContext } from './components/SpellContext';
import { Spell } from './types/Spell';

const App = () => {
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>(() => {
    const storedSpells = localStorage.getItem('selectedSpells')
    return storedSpells ? JSON.parse(storedSpells) : []
  })
  
  useEffect(() => {
    localStorage.setItem('selectedSpells', JSON.stringify(selectedSpells))
  }, [selectedSpells])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <SpellContext.Provider value={{ selectedSpells, setSelectedSpells }}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Landing />} />
                <Route path='spells' element={<AllSpells />} />
                <Route path='myspells' element={<MySpells />} />
            </Route>
          </Routes>
        </SpellContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App
