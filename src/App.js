import React, { useEffect } from 'react';
import './style.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

//Import Pages and Components
import HomePage from './Pages/HomePage';
import Contact from './Pages/Contact';
import NoPage from './Pages/NoPage';

import DATA from './Data Base/DATA';
import Epub from './Components/Epub';

// Init Google Analytics
ReactGA.initialize('G-27RP7RRY2W');

export default function App() {
  const location = useLocation();

  // Fired on every route change
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  const UrlBase = 'https://zeektenka.github.io/files/';

  const routes = DATA.map((item) => {
    return (
      <Route
        key={item.id}
        path={item.path}
        element={<Epub uri={`${UrlBase}${item.uri}`} />}
      />
    );
  });

  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="contact" element={<Contact />} />
        {routes}
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}
