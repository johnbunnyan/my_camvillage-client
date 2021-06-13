import axios from 'axios'
import React, { useState, useEffect } from 'react';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

function MyRequest() {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  function getSent() {
    axios
    .get('http://localhost:4000/user/request', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then(res => setSentRequests(res.data))
    .catch(e => console.log(e));

    console.log(sentRequests);
  }

  function getReceived() {
    axios.get('http://localhost:4000/user/requested', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then(res => setReceivedRequests(res.data))
    .catch(e => console.log(e));

    console.log(receivedRequests);
  }

  useEffect(() => {getSent()}, [])
  useEffect(() => {getReceived()}, [])

  return (
    <div id="myrequest-body">
      <div id="received-request">
        <div id="received-request-title">내가 받은 요청</div>
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
      <div id="sent-request">
        <div id="sent-request-title">내가 보낸 요청</div>
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