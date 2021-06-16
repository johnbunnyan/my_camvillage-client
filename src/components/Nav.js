import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.js';
import SearchBar from './SearchBar.js';

function Nav() {
  return (
    <div id="nav-body">
      <div id="nav-title">
        <Link to="/">CamVillage</Link>
      </div>
      <SearchBar />
      <div id="nav-btn">
        <Link to="/item/upload">글쓰기</Link>
        <Dropdown />
      </div>
    </div>
  );
}

export default Nav;