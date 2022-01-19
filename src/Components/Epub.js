import React, { useState, useEffect, useRef } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import {
  HiOutlineCog,
  HiChevronLeft,
  HiChevronRight,
  HiMoon,
  HiOutlineMoon,
} from 'react-icons/hi';

// If confused ,Read the Docs https://github.com/gerhardsletten/react-reader#add--adjust-custom-css-for-the-epub-html

const Epub = () => {
  // Settings Tile Stuff
  const [settingsOpen, setSettingOpen] = useState(false);

  // Dark mode & Light mode
  const [isDark, setDark] = useState(false);

  const ownStyles = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: isDark ? 'black' : 'white',
    },
  };
  const textColor = { color: isDark ? 'white' : 'black' };

  // And your own state logic to persist state
  const [location, setLocation] = localStorage.CurrentPage
    ? useState(JSON.parse(localStorage.CurrentPage))
    : useState(null);

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
    localStorage.setItem('CurrentPage', JSON.stringify(location));
  };

  // Font size stuff
  const [size, setSize] = localStorage.fontSize
    ? useState(JSON.parse(localStorage.fontSize))
    : useState(100);
  const renditionRef = useRef(null);
  const changeSize = (newSize) => {
    setSize(newSize);
  };
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
      localStorage.setItem('fontSize', JSON.stringify(size));
    }
  }, [size, isDark]);

  useEffect(() => {}, [isDark]);
  return (
    <div style={{ height: '98vh', position: 'relative', top: '0rem' }}>
      <ReactReader
        location={location}
        styles={ownStyles}
        locationChanged={locationChanged}
        url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          renditionRef.current.themes.fontSize(`${size}%`);
          // Custom Styles

          rendition.themes.register('custom', {
            img: {
              width: '100%',
            },
            p: {
              color: isDark ? 'white' : 'green',
            },
          });
          rendition.themes.select('custom');
        }}
      />
      <div className="settings">
        <button
          className="icon-btn"
          onClick={() => setSettingOpen(!settingsOpen)}
        >
          <HiOutlineCog
            color={settingsOpen ? 'orange' : 'grey'}
            fontSize="1.4rem"
          />
        </button>
        <div
          id="settings_container"
          style={{ display: settingsOpen ? 'flex' : 'none' }}
        >
          <p className="small-title">Font Size</p>
          <div className="fontsize_change_div">
            <button
              className="icon-btn"
              onClick={() => changeSize(Math.max(70, size - 10))}
            >
              <HiChevronLeft color="grey" fontSize="1.4rem" />
            </button>
            <span className="size">{size}%</span>
            <button
              className="icon-btn"
              onClick={() => changeSize(Math.min(150, size + 10))}
            >
              <HiChevronRight color="grey" fontSize="1.4rem" />
            </button>
          </div>

          <p className="small-title">Dark Mode</p>
          <div style={{ textAlign: 'center' }}>
            <button className="icon-btn" onClick={() => setDark(!isDark)}>
              <HiMoon color="grey" fontSize="1.4rem" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Epub;
