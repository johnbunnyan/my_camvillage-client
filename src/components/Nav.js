import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.js';
import SearchBar from './SearchBar.js';

function Nav() {
  return (
    <div id="nav-body">
      <Link to="/" id="nav-title">캠빌리지</Link>
      <SearchBar />
      <div id="nav-btn">
        <Link to="/item/upload">글쓰기</Link>
        <Dropdown />
      </div>
    </div>
  );
}

export default Nav;