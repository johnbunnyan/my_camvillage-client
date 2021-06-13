import React from 'react';
import { Link, withRouter } from "react-router-dom";

function MyPage(props) {
  
  console.log('MyPage state = ' , props.userInfo)
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
        <img alt=""></img>
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