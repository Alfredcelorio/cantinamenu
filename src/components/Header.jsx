/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import MenuIcon from '../assets/icons/menu.png';
import '../css/Header.css';
import SearchField from './SearchField';

export default function Header({
  categories,
  setSelectedCategory,
  stopScroll,
  setOpenList,
  selectedCategory,
  setProducts,
  setLoading,
  restaurant,
  media,
  setLoadData,
}) {
  const [currentSatus, setCurrentSatus] = useState('');
  const [focused, setFocused] = useState(false);

  const getTimeOfDay = () => {
    const todayDate = moment().utcOffset(0, true).format();
    const timeString = todayDate?.split('T')?.[1]?.split(':')?.[0];
    // eslint-disable-next-line radix
    const time = parseInt(timeString);

    const a = media ? '!' : '';

    if (time < 12 && time > 3) {
      setCurrentSatus(`Good Morning${a}`);
    } else if (time >= 12 && time < 17) {
      setCurrentSatus(`Good Afternoon${a}`);
    } else {
      setCurrentSatus(`Good Evening${a}`);
    }
  };

  useEffect(() => {
    getTimeOfDay();
  }, []);

  const handleSubCategory = (item) => {
    if (item?.name === selectedCategory?.name) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

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
            <div className={`header_status ${focused && 'header_status_hide'}`}>{currentSatus}</div>
            <div className="header_text">Choose Your Desired Drinks</div>
          </div>
          <div className={`header_right ${focused && 'header_focused'}`}>
            {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <SearchField
              restaurantId={restaurant?.id}
              setLoading={setLoading}
              setLoadData={setLoadData}
              setFocused={setFocused}
              setProducts={setProducts}
            />
            <button className="header_menu" type="submit" onClick={() => setOpenList(true)}>
              <img src={MenuIcon} alt="menu" />
              <span>Menu</span>
            </button>
          </div>
        </div>
        <div className="header_subcategories">
          {categories?.map((item) => (
            <button
              className={`header_subcategory ${
                item?.name === selectedCategory?.name && 'header_subcategory_active'
              }`}
              onClick={() => handleSubCategory(item)}
              type="submit"
              key={item.id}
            >
              {media ? item.name?.toUpperCase() : item?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
