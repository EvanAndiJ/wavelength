import './App.css';
import React, {useState} from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ColorContext } from './context/Contexts.ts';

export default function App() {
  const [theme, setTheme] = useState('blues')
  const toggleTheme = () => {
    setTheme(theme === 'blues' ? 'reds' : 'blues')
  }
  
  return (
    <ColorContext.Provider value={{theme, setTheme: toggleTheme}}>
    <div className={`App ${theme}`}>
      <h1 className='mainTitle '>WAVELENGTH</h1>
      <Outlet/>
    </div>
    </ColorContext.Provider>
  );
}