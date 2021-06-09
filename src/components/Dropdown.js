import React from 'react';
import { Link } from 'react-router-dom';

function Dropdown() {
  return (
    <div className="dropdown">
      <button className="dropbtn">메뉴</button>
      <div className="dropdown-content">
        <Link to="/mypage">마이페이지</Link>
        <Link to="/logout">로그아웃</Link>
      </div>
    </div>
  );
}

export default Dropdown;