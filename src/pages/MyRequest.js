import axios from 'axios'
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

function MyRequest() {
  const state = useSelector(state => state);
  console.log(state)
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  function getSent() {
    axios
    .get(`${process.env.REACT_APP_API_URL}/user/request`, 
    {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      setSentRequests(res.data.request)
      console.log(sentRequests)
    })
    .catch(e => console.log(e));
  }

  function getReceived() {
    axios.get(`${process.env.REACT_APP_API_URL}/user/requested`, 
    {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      setReceivedRequests(res.data.request)
      console.log(receivedRequests)})
    .catch(e => console.log(e));
  }

  useEffect(() => {getSent()}, [])
  useEffect(() => {getReceived()}, [])

  return (
    <div id="myrequest-body">
      <div id="myrequest-received-request">
        <div id="myrequest-received-request-title">내가 받은 요청</div>
          {
            receivedRequests.map(({ image, title, id, confirmation }) => 
            <PrevWButton 
              image={image}
              title={title}
              id={id}
              confirmation={confirmation}
            />)
          }
      </div>
      <div id="myrequest-sent-request">
        <div id="myrequest-sent-request-title">내가 보낸 요청</div>
          {
            sentRequests.map(({ image, title, id, confirmation }) => 
            <PrevWStatus 
              image={image}
              title={title}
              id={id}
              confirmation={confirmation}
            />)
          }
      </div>
    </div>
  );
}

export default MyRequest;

