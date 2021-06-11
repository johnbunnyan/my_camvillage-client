import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions/index';

function Dropdown(props) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(userLogout());
    props.history.push('/');
  }

  return (
    <div className="dropdown">
      <button className="drop-btn">메뉴 ({state.notifications})</button>
      <div className="dropdown-content">
        <Link to="/mypage">마이페이지 ({state.notifications})</Link>
        <div id="logout-btn" onClick={handleLogout}>로그아웃</div>
      </div>
    </div>
  );
}

export default Dropdown;