import React, { useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { HiOutlineCog } from 'react-icons/hi';

const Epub = () => {
  // And your own state logic to persist state
  const [location, setLocation] = localStorage.CurrentPage
    ? useState(JSON.parse(localStorage.CurrentPage))
    : useState(null);

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
    localStorage.setItem('CurrentPage', JSON.stringify(location));
  };
  return (
    <div style={{ height: '98vh', position: 'relative', top: '0rem' }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
      />
      <div className="settings">
        {' '}
        <HiOutlineCog color="grey" fontSize="1.4rem" />
      </div>
    </div>
  );
};

export default Epub;
