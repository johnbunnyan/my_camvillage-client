import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions/index';

function Dropdown() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    console.log('state')
    console.log(state)
    axios
      .post('http://localhost:4000/user/logout', {},
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
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
      <button className="drop-btn">메뉴</button>
      <div className="dropdown-content">
        <Link to="/user/mypage">마이페이지</Link>
        <button id="logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default Dropdown;