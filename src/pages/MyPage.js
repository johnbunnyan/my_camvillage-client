import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, withRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setCategory, setQueryString } from '../actions';
import PrevWTitle from '../components/PrevWTitle';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

require("dotenv").config();

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
      .get(`${process.env.REACT_APP_API_URL}/user/request`,
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
      .get(`${process.env.REACT_APP_API_URL}/user/requested`,
        {
          headers: {
            'Authorization': `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      .then(res => {
        setReceivedRequests(res.data.request)
        console.log(res.data.request)
      })
      .then(res => {
        console.log('receivedRequests = ', receivedRequests);
      })
      .catch(e => console.log(e));

    
  }

  function getPost() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/search`,
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

  function handleImageURL(image) {
    if(image) {
      return (<img src={`${process.env.REACT_APP_API_URL}/${image}`} alt="mypage-img"></img>)
    }
  }

  function showPosts() {
    let posts = getPosts.slice(0, 3);
    if (posts.length < 3) {
      while (posts.length < 3) {
        posts.push('dummy');
      }
    }

    return posts.map((post, index) => {
      if (post === 'dummy') {
        return (
          <div className="prevwtitle-body">
            <div className="preview-img-container">
            </div>
            <div className="preview-title"></div>
          </div>
        )
      }
      return (
        <PrevWTitle
          image={post.image}
          title={post.title}
          id={post.id}
          key={index}
        />
      )
    })
  }

  function showSent() {
    let sent = sentRequests.slice(0, 3);
    if (sent.length < 3) {
      while (sent.length < 3) {
        sent.push('dummy');
      }
    }

    return sent.map(post => {
      if (post === 'dummy') {
        return (
          <div className="prevwstatus-body">
            <div className="preview-img-container">
            </div>
            <div className="preview-title"></div>
          </div>
        )
      }
      return (
        <PrevWStatus
          image={post.image}
          title={post.title}
          id={post.id}
          confirmation={post.confirmation}
        />
      )
    })
  }

  function showReceived() {
    let received = receivedRequests.slice(0, 3);
    if (received.length < 3) {
      while (received.length < 3) {
        received.push('dummy');
      }
    }

    return received.map(post => {
      if (post === 'dummy') {
        return (
          <div className="prevwbutton-body">
            <div className="preview-img-container">
            </div>
            <div className="preview-title"></div>
          </div>
        )
      }
      return (
        <PrevWButton
          requestid={post.userId}
          image={post.image}
          title={post.title}
          id={post.id}
          confirmation={post.confirmation}
        />
      )
    })
  }

  return (
    <div id="mypage-body">
      <div id="mypage-top">
        <div id="mypage-img">
          {handleImageURL(state.userInfo.user_image)}
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
            {showPosts()}
          </div>
        <div className="btn-container">
          <button id="mypage-post-btn" onClick={handleClickPost}>더보기</button>
        </div>
        </div>
        <div id="mypage-request">
          <div id="request-container">
            <div id="mypage-received-request">
              <div id="mypage-received-request-title">받은 요청</div>
              {showReceived()} 
            </div>
            <div id="mypage-sent-request">
              <div id="mypage-sent-request-title">보낸 요청</div>
              {showSent()} 
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