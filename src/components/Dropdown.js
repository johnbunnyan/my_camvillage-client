import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions/index';

function Dropdown(props) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(userLogout());
    history.push('/');
  }

  return (
    <div className="dropdown">
      <button className="drop-btn">메뉴 ({state.notifications})</button>
      <div className="dropdown-content">
        <Link to="/user/mypage">마이페이지 ({state.notifications})</Link>
        <div id="logout-btn" onClick={handleLogout}>로그아웃</div>
      </div>
    </div>
  );
}

export default Dropdown;