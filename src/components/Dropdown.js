import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dropdown() {
  const state = useSelector(state => state);
  return (
    <div className="dropdown">
      <button className="dropbtn">메뉴 ({state.notifications})</button>
      <div className="dropdown-content">
        <Link to="/mypage">마이페이지 ({state.notifications})</Link>
        <Link to="/logout">로그아웃</Link>
      </div>
    </div>
  );
}

export default Dropdown;