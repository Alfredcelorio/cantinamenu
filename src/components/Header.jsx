/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import '../css/Header.css';

export default function Header({
  stopScroll, setOpenList, restaurant, media,
}) {
  const [currentSatus, setCurrentSatus] = useState('');

  const getTimeOfDay = () => {
    const a = media ? '!' : '';

    setCurrentSatus(`Welcome to La 20${a}`);
  };

  useEffect(() => {
    getTimeOfDay();
  }, [restaurant]);

  return (
    <div className="header_wrapper">
      <div style={{ background: restaurant.landingImage }} className="header_container">
        <div className="header_overlay" />
        <div className="header_container_content">
          <img className="header_logo" src={restaurant?.logo} alt="logo" />
          <div className="header_logo_text">
            <div className="header_logo_left">{restaurant?.restaurantName}</div>
            {/* <div className="header_logo_right">VEINTE</div> */}
          </div>
        </div>
      </div>
      <div className={`header ${stopScroll && 'sticky_header'}`}>
        <div className="header_top">
          <div className="header_left">
            <button className="header_back" type="button" onClick={() => setOpenList(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="header_status">{currentSatus}</div>
            <div className="header_text">Explore Our Menu</div>
          </div>
        </div>
      </div>
    </div>
  );
}
