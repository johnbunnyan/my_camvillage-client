import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, withRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setCategory, setQueryString } from '../actions';
import PrevWTitle from '../components/PrevWTitle';
import YesNoButton from '../components/YesNoButton';
import PrevWStatus from '../components/PrevWStatus';

function MyPage() {

  const state = useSelector((state) => state);
  console.log('MyPage state = ', state)
  const dispatch = useDispatch();
  const history = useHistory();

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [getPosts, setGetPosts] = useState([]);

  function getSent() {
    axios
      .get('http://localhost:4000/user/request',
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      .then(res => {
        setSentRequests(res.data.request)
      })
      .then(res => {
        console.log('sentRequests = ', sentRequests);
      })
      .catch(e => console.log(e));
  }

  function getReceived() {
    axios
      .get('http://localhost:4000/user/requested',
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      .then(res => {
        setReceivedRequests(res.data.request)
      })
      .then(res => {
        console.log('receivedRequests = ', receivedRequests);
      })
      .catch(e => console.log(e));

    
  }

  function getPost() {
    axios
      .post('http://localhost:4000/search',
        {
          category: 'nickname',
          queryString: state.userInfo.nickname,
        })
      .then(res => {
        setGetPosts(res.data)
      })
      .then(res => {
        console.log('getPosts = ', getPosts)
      })
      .catch(e => {
        console.log(e);
      })

  }

  function handleClickPost() {
    dispatch(setQueryString(state.userInfo.nickname));
    dispatch(setCategory('nickname'));
    history.push(`/search?q=${state.userInfo.nickname}&cat='nickname'`)
  }

  function handleClickMessage() {
    history.push('/user/request')
    
  }

  useEffect(() => { getSent() }, [])
  useEffect(() => { getReceived() }, [])
  useEffect(() => { getPost() }, [])



  return (
    <div id="mypage-body">
      <div id="mypage-leftside">
        <img id="img" src={state.userInfo.image}></img>
        <div id="name">{state.userInfo.name}</div>
        <div id="nickname">{state.userInfo.nickname}</div>
        <div id="email">{state.userInfo.email}</div>
        <Link to="/user/alter">회원정보 수정</Link>
      </div>
      <div id="mypage-rightside">
        <div id="mypage-post"> 내가 올린 글
          {getPosts.map(({ image, title, id }, index) => {
            return (
              <div className="post-one">
                <PrevWTitle
                  image={image}
                  title={title}
                  id={id}
                  key={index}
                />
              </div>
            )
          }).slice(0, 5)}
          <button onClick={handleClickPost}>더보기 </button>
        </div>
        <div id="mypage-message">
          <div id="mypage-received-request">
            <div id="mypage-received-request-title">내가 받은 요청</div>
            {
              receivedRequests.map(({ image, title, id, confirmation }) =>
                <YesNoButton
                  image={image}
                  title={title}
                  id={id}
                  confirmation={confirmation}
                />).slice(0,5)
            } 
          </div>
          <div id="mypage-sent-request">
            <div id="mypage-sent-request-title">내가 보낸 요청</div>
            {
              sentRequests.map(({ image, title, id, confirmation }) =>
                <PrevWStatus
                  image={image}
                  title={title}
                  id={id}
                  confirmation={confirmation}
                />).slice(0,5)
            } 
          </div>
          <button onClick={handleClickMessage}>더보기 </button>
        </div>
      </div>
    </div>
  );

}

export default withRouter(MyPage);