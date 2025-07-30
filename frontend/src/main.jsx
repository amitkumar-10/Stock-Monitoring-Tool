import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import HomePage from './landing_page/home/HomePage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProductPage from './landing_page/Products/ProductPage';
import SignUp from './landing_page/signUp/SignUp';
import Login from './landing_page/signUp/Login';
import SupportPage from './landing_page/support/SupportPage';
import PricingPage from './landing_page/Pricing/PricingPage';
import AboutPage from './landing_page/about/AboutPage';
import NotFound from './landing_page/NotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage />} /> 
      <Route path='/signup' element={<SignUp />} />
      <Route path="/login" element={<Login />} /> 
      <Route path='/about' element={<AboutPage />} />
      <Route path='/product' element={<ProductPage />} />
      <Route path='/price' element={<PricingPage />} />
      <Route path='/support' element={<SupportPage />} />
      <Route path='*' element={<NotFound/>}/>
    </Route>
    
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);