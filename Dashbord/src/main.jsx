import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Orders from './Components/Orders.jsx'
import Positions from './Components/Positions.jsx'
import Funds from './Components/Funds.jsx'
import Holding from './Components/Holding.jsx'
import Homepage from './Components/Home/HomePage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
          
      <Route path="/" element={<App />}>
        <Route path='' element={<Homepage />} />
        
        <Route path="/orders" element={<Orders />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/holding" element={<Holding />} />

      </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
