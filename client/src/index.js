import './index.css';
// import 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx';

import Start from './routes/start.tsx';
import Game from './routes/room.tsx';
import Dash from './routes/Dash.tsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/wavelength" element={<App />} >

        <Route index element={<Start />}/>
        <Route path="room">
          <Route path=":roomCode" element={<Game/>}/>
        </Route>
        <Route path='dashboard' element={<Dash/>}/>
      </Route>

      <Route path="*" element={<h1>Oops, nothing here</h1>} />
    </Routes>
  </BrowserRouter>
);
