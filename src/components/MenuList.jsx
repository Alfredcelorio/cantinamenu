/* eslint-disable object-curly-newline */
import React from 'react';

function MenuList({ menus, setSelectedMenu, setOpenList, setSelectedCategory }) {
  const handleMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedCategory('');
  };

  return (
    <div className="popup">
      <div className="popup_list">
        {menus?.map((item) => (
          <div
            key={item.id || item.name}
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
    </div>
  );
}

export default MenuList;
