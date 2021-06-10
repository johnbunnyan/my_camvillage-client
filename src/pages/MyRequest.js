import axios from 'axios'
import React, { useEffect, useState } from 'react';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

function MyRequest() {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    setSentRequests(axios.get('https://localhost:8080/user/request', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    }));
    
    setReceivedRequests(axios.get('https://localhost:8080/user/requested', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    }));
  })

  return (
    <div id="myrequest-body">
      <div id="received-request">
        <div id="received-request-title">내가 받은 대여 요청</div>
        {
          sentRequests.map(sentRequests => 
            <PrevWButton img={sentRequests.img} title={sentRequests.title} item_id={sentRequests.id} content={sentRequests.content}/> // db에 저장되는 형태 보고 다시 수정 필요
          )
        }
      </div>
      <div id="sent-request">
        <div id="sent-request-title">내가 보낸 대여 요청</div>
        {
          receivedRequests.map(receivedRequests => 
            <PrevWStatus img={receivedRequests.img} title={receivedRequests.title} item_id={receivedRequests.id} content={receivedRequests.content}/> // db에 저장되는 형태 보고 다시 수정 필요
          )
        }
      </div>
    </div>
  );
}

export default MyRequest;