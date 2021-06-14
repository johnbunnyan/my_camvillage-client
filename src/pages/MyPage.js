import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, withRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setCategory, setQueryString } from '../actions';
import PrevWTitle from '../components/PrevWTitle';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

function MyPage(props) {


  console.log('MyPage state = ', props.userInfo)
  const dispatch = useDispatch();
  const history = useHistory();

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [getPosts, setGetPosts] = useState([]);

  function getSent() {
    axios
      .get('http://localhost:4000/user/request',
        {
          'Content-Type': 'application/json',
          'withCredentials': true,
        })
      .then(res => setSentRequests(res.data))
      .catch(e => console.log(e));

    console.log(sentRequests);
  }

  function getReceived() {
    axios.get('http://localhost:4000/user/requested',
      {
        'Content-Type': 'application/json',
        'withCredentials': true,
      })
      .then(res => setReceivedRequests(res.data))
      .catch(e => console.log(e));

    console.log(receivedRequests);
  }

  function getPost() {
    axios
      .post('http://localhost:4000/search',
        {
          category: 'nickname',
          queryString: props.userInfo.nickname,
        })
      .then(res => setGetPosts(res.data))
      .catch(e => {
        console.log(e);
      })

  }

  function handleClickPost() {
    dispatch(setQueryString(props.userInfo.nickname));
    dispatch(setCategory('nickname'));
    history.push(`/search?q=${props.userInfo.nickname}&cat='nickname'`)
  }

  function handleClickMessage() {
    history.push('/user/request')
    
  }

  useEffect(() => { getSent() }, [])
  useEffect(() => { getReceived() }, [])
  useEffect(() => { getPost() }, [])



  return (
    <div id="mypage-body">
      <div id="leftside">
        <img id="img" src={props.userInfo.image}></img>
        <div id="name">{props.userInfo.name}</div>
        <div id="nickname">{props.userInfo.nickname}</div>
        <div id="email">{props.userInfo.email}</div>
        <Link to="/user/alter">회원정보 수정</Link>
      </div>
      <div id="rightside">
        <div id="post">
          {getPosts.map(({ image, title, id }) => {
            return (
              <div className="post-one">
                <PrevWTitle
                  image={image}
                  title={title}
                  id={id}
                />
              </div>
            )
          }).slice(0, 5)}
          <button onClick={handleClickPost}>더보기 </button>
        </div>
        <div id="message">
          <div id="received-request">
            <div id="received-request-title">내가 받은 요청</div>
            {
              receivedRequests.map(({ image, title, id, confirmation }) =>
                <PrevWButton
                  image={image}
                  title={title}
                  id={id}
                  confirmation={confirmation}
                />).slice(0,5)
            }
          </div>
          <div id="sent-request">
            <div id="sent-request-title">내가 보낸 요청</div>
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