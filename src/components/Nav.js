import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.js';
import SearchBar from './SearchBar.js';

function Nav() {
  let logo = <img id="logo" src="../logo.png" alt="" />

  return (
    <div id="nav-body">
      <span id="title">
        {logo}
        <Link to="/">CamVillage</Link>
      </span>
      <SearchBar />
      <Link to="/item/upload">글쓰기</Link>
      <Dropdown />
    </div>
  );
}

export default Nav;