import React, { useState, useEffect, useRef } from 'react';
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

  // Font stuff
  const [size, setSize] = useState(100);
  const renditionRef = useRef(null);
  const changeSize = (newSize) => {
    setSize(newSize);
  };
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  return (
    <div style={{ height: '98vh', position: 'relative', top: '0rem' }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          renditionRef.current.themes.fontSize(`${size}%`);
        }}
      />
      <div className="settings">
        <HiOutlineCog color="grey" fontSize="1.4rem" />
        <div id="settings_container">
          <p>Font Size</p>
          <div className='fontsize_change_div'>
            <button className='small-btn' onClick={() => changeSize(Math.max(80, size - 10))}>
              -
            </button>
            <span className="size">{size}%</span>
            <button className='small-btn' onClick={() => changeSize(Math.min(130, size + 10))}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Epub;
