/* eslint-disable object-curly-newline */
import React from 'react';
import Cross from '../assets/icons/close.png';

function MenuList({ menus, setSelectedMenu, setOpenList, setSelectedCategory }) {
  const handleMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedCategory('');
  };

  return (
    <div className="popup">
      <div className="popup_select">Select Type</div>
      <div className="popup_list">
        {menus?.map((item) => (
          <div
            role="presentation"
            onClick={() => {
              handleMenu(item);
              setOpenList(false);
            }}
            className="popup_name"
          >
            {item.name}
          </div>
        ))}
      </div>
      <button onClick={() => setOpenList(false)} className="popup_btn" type="submit">
        <img className="popup_btn_icon" src={Cross} alt="close" />
      </button>
    </div>
  );
}

export default MenuList;
