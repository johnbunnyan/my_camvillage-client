import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, withRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setCategory, setQueryString } from '../actions';
import PrevWTitle from '../components/PrevWTitle';
import PrevWButton from '../components/PrevWButton';
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
            'Authorization': `Bearer ${state.accessToken}`,
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
            'Authorization': `Bearer ${state.accessToken}`,
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
    history.push(`/search?q=${state.userInfo.nickname}&cat=nickname`)
  }

  function handleClickMessage() {
    history.push('/user/request')
    
  }

  useEffect(() => { getSent() }, [])
  useEffect(() => { getReceived() }, [])
  useEffect(() => { getPost() }, [])



  return (
    <div id="mypage-body">
      <div id="mypage-top">
        <div id="mypage-img">
          <img src={state.userInfo.image} alt="mypage-img"></img>
        </div>
        <div id="mypage-info">
          <div>
            <div className="mypage-info-label">이름:</div>
            <div className="mypage-info-input">{state.userInfo.name}</div>
          </div>
          <div>
            <div className="mypage-info-label">아이디:</div>
            <div className="mypage-info-input">{state.userInfo.user_id}</div>
          </div>
          <div>
            <div className="mypage-info-label">닉네임:</div>
            <div className="mypage-info-input">{state.userInfo.nickname}</div>
          </div>
          <div>
            <div className="mypage-info-label">이메일:</div>
            <div className="mypage-info-input">{state.userInfo.email}</div>
          </div>
          <div className="btn-container">
            <Link to="/user/alter">회원정보 수정</Link>
          </div>
        </div>
      </div>
      <div id="mypage-bottom">
        <div id="mypage-post">
          <div id="mypage-post-title">나의 작성글</div>
          <div id="post-container">
            {getPosts.map(({ image, title, id }, index) => {
              return (
                <PrevWTitle
                  image={image}
                  title={title}
                  id={id}
                  key={index}
                />
              )
            }).slice(0, 3)}
          </div>
        <div className="btn-container">
          <button id="mypage-post-btn" onClick={handleClickPost}>더보기</button>
        </div>
        </div>
        <div id="mypage-request">
          <div id="request-container">
            <div id="mypage-received-request">
              <div id="mypage-received-request-title">받은 요청</div>
              {
                receivedRequests.map(({ image, title, id, confirmation }) =>
                  <PrevWButton
                    image={image}
                    title={title}
                    id={id}
                    confirmation={confirmation}
                  />).slice(0,3)
              } 
            </div>
            <div id="mypage-sent-request">
              <div id="mypage-sent-request-title">보낸 요청</div>
              {
                sentRequests.map(({ image, title, id, confirmation }) =>
                  <PrevWStatus
                    image={image}
                    title={title}
                    id={id}
                    confirmation={confirmation}
                  />).slice(0,3)
              } 
            </div>
          </div>
          <div className="btn-container">
            <button id="mypage-request-btn" onClick={handleClickMessage}>더보기</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default withRouter(MyPage);