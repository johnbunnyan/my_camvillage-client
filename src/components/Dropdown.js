import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions/index';

function Dropdown() {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    axios.post('http://localhost:4000/user/logout',
    {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then(res => {
      dispatch(userLogout());
      history.push('/');
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div className="dropdown">
      <button className="drop-btn">메뉴 ({notifications})</button>
      <div className="dropdown-content">
        <Link to="/user/mypage">마이페이지 ({notifications})</Link>
        <div id="logout-btn" onClick={handleLogout}>로그아웃</div>
      </div>
    </div>
  );
}

export default Dropdown;