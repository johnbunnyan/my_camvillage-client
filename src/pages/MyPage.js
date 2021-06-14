import React, { useEffect, useState } from 'react';
import { userRequest, userRequested } from '../actions/index';
import { Link, withRouter, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function MyPage(props) {
  
  console.log('MyPage state = ' , props.userInfo)
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    requestLists: [],
    requestedLists: [],
  })

  setInputs({
    requestLists: dispatch(userRequest(props.accessToken)),
    requestedLists: dispatch(userRequested(props.accessToken))
  })

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
        {inputs.requestLists.map((item, idx) => {
            return (
              <div className="request">
                <div value={item.uesrId}></div>
                <span value={item.confirmation}></span>
                <Link to="/user/alter">회원정보 수정</Link>
              </div>
            )
          }).slice(0,5)}
        </div>
        <div id="message">
        {inputs.requestLists.map((item, idx) => {
            return (
              <div className="request">
                <div value={item.uesrId}></div>
                <span value={item.confirmation}></span>
                <Link to="/user/alter">회원정보 수정</Link>
              </div>
            )
          }).slice(0,5)}
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);