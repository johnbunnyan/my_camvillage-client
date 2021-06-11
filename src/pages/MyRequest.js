import axios from 'axios'
import React, { useEffect, useState } from 'react';
import PrevWButton from '../components/PrevWButton';
import PrevWStatus from '../components/PrevWStatus';

function MyRequest() {
  const [myRequests, setMyRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  // request + requested consolidated table
  // api 및 db 확인 필요
  useEffect(() => {
    axios.get('https://localhost:8080/user/request', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => setSentRequests(res.data))
    .catch((e) => {
      console.log(e);
    });

    axios.get('https://localhost:8080/user/requested', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => setReceivedRequests(res.data))
    .catch((e) => {
      console.log(e);
    });

    // const date = new Date();
    
    // const dummySent = [
    //   {
    //     "id": 11s23213,
    //     "userId": 'kimcoding',
    //     "title": '텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '0', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   },
    //   {
    //     "id": 1123213,
    //     "userId": 'kimcoding',
    //     "title": '텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '1', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   },
    //   {
    //     "id": 1123213,
    //     "userId": 'kimcoding',
    //     "title": '텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '2', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   }
    // ]
    // const dummyReceived = [
    //   {
    //     "id": 24353,
    //     "userId": 'parkhacker',
    //     "title": '파란 텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '1', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   },
    //   {
    //     "id": 24353,
    //     "userId": 'parkhacker',
    //     "title": '파란 텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '0', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   },
    //   {
    //     "id": 24353,
    //     "userId": 'parkhacker',
    //     "title": '파란 텐트 빌려드립니다',
    //     "image": '',
    //     "confirmation": '2', // '0': no response, '1': yes, '2': no
    //     "createdAt": date,
    //     "updatedAt": date
    //   }
    // ]

    // setSentRequests(dummySent);
    // setReceivedRequests(dummyReceived);
  })
  
  return (
    <div id="myrequest-body">
      <div id="received-request">
        <div id="received-request-title">내가 받은 대여 요청</div>
        {
          sentRequests.map(({ image, title, id, confirmation }) => 
            <PrevWButton
            image={image}
            title={title}
            id={id}
            confirmation={confirmation} />
          )
        }
      </div>
      <div id="sent-request">
        <div id="sent-request-title">내가 보낸 대여 요청</div>
        {
          receivedRequests.map(({ image, title, id, confirmation }) => 
            <PrevWStatus
            image={image}
            title={title}
            id={id}
            confirmation={confirmation} />
          )
        }
      </div>
    </div>
  );
}

export default MyRequest;