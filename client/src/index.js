import './index.css';
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
      <Route path="/" element={<App />} >

        <Route index element={<Start />}/>
        <Route path="room">
          <Route path=":roomCode" element={<Game/>}/>
        </Route>
      </Route>
      <Route path='temproom' element={<Game/>}/>
      <Route path='dash' element={<Dash/>}/>

      <Route path="*" element={<h1>Oops, nothing here</h1>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals