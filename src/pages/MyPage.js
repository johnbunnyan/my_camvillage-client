import React, { useEffect, useState } from 'react';
import { userRequest, userRequested } from '../actions/index';
import { Link, withRouter, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function MyPage(props) {
  
  console.log('MyPage state = ' , props.userInfo)
  const dispatch = useDispatch();

  /*
  const onload = () => {
    dispatch(userRequest(props.accessToken));
    dispatch(userRequested(props.accessToken));
  }
  onload();
  */

  return (
    <div id="mypage-body">
      <div id="leftside">
        <img></img>
        <div id="name">{props.userInfo.name}</div>
        <div id="nickname">{props.userInfo.nickname}</div>
        <div id="email">{props.userInfo.email}</div>
      <Link to="/user/alter">회원정보 수정</Link>
      </div>
      <div id="rightside">
        <div id="post">

        </div>
        <div id="messgae">

        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);