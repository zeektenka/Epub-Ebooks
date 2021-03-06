import React from 'react';
import DATA from '../Data Base/DATA';
import { Link } from 'react-router-dom';

const Home = () => {
  const links = DATA.map((item, index) => {
    return (
      <li key={item.id} style={{ padding: '10px' }}>
        {index + 1} <Link to={item.path}>{item.uri}</Link>
      </li>
    );
  });
  return (
    <>
      <h1>Home</h1>
      <hr />
      {links}
    </>
  );
};

export default Home;
