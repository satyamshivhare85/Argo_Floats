import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// 1. Import your ContextProvider
import ContextProvider from './context/Context'; 

import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignUp from './components/Signup/Signup';
import Faq from './components/Faq/Faq';
import Map from './components/Map/Map';
import Chatbot from './components/Chatbot/Chatbot';
import Talk from './components/Talk/Talk';
import News from './components/News/News';
import Weatherforecasting from './components/Weather/Weatherforecasting';
import OceanResearch from './components/OceanResearch/OceanResearch';
import Climatemonitoring from './components/Cimatemonitoring/Climatemonitoring';
import Dashboard from './components/Dashboard/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/features"/>
      <Route path="/facts"/>
      <Route path="/chatbot" element={<Chatbot/>}/>
      <Route path="/faq" element={<Faq/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/talkai" element={<Talk/>}/>
      <Route path="news" element={<News/>}/>
      <Route path="/climate-monitoring" element={<Climatemonitoring />} />
      <Route path="/weather-forecasting" element={<Weatherforecasting />} />
      <Route path="/ocean-research" element={<OceanResearch />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your RouterProvider with the ContextProvider */}
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);