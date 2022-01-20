import React, { useEffect } from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';

//Import Pages and Components
import HomePage from './Pages/HomePage';
import Contact from './Pages/Contact';
import NoPage from './Pages/NoPage';

import DATA from './Data Base/DATA';
import Epub from './Components/Epub';

export default function App() {
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
