import React, { useState, useRef } from 'react';
import SearchInput from 'react-search-input';
// import SearchIcon from '../assets/icons/SearchIcon.svg';
import Search from '../assets/icons/Search.png';
import { getSearchedProducts } from '../utils/getData';

function SearchField({
  setFocused, setLoading, setProducts, restaurantId, setLoadData,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getSearchedProducts(searchTerm, setLoading, setProducts, restaurantId, setLoadData);
    }
  };

  const searchRef = useRef(null);

  const el = document.getElementsByClassName('search-input');

  return (
    <div
      role="presentation"
      className="header_serach"
      onBlur={() => setFocused(false)}
      onClick={() => {
        setFocused(true);
        el?.[0].children?.[0].focus();
      }}
    >
      <SearchInput
        ref={searchRef}
        id="search"
        onKeyDown={handleSearch}
        placeholder="Search"
        className="search-input"
        onChange={setSearchTerm}
      />
      <img src={Search} alt="" className="search-input-icon" />
    </div>
  );
}

export default SearchField;
