import React from 'react';

import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Watchlist from "./Components/WatchList";
import { GeneralContextProvider } from "./Components/GeneralContext";

function App() {

  return (
    <>
      <Navigation/>
      <div className="dashboard-container">

        <GeneralContextProvider>
        <Watchlist />
        </GeneralContextProvider>
        
        <div className="content">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default App
