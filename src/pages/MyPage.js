import axios from 'axios'
import React, { useEffect, useState } from 'react';
import PrevWTitle from '../components/PrevWTitle';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function MyPage() {
  const { name, nickname, email, img } = useSelector(state => state.userInfo)
  const [myRequests, setMyRequests] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const history = useHistory();

  // request + requested consolidated table
  // api 및 db 확인 필요
  useEffect(() => {
    setMyRequests(axios.get('https://localhost:8080/user/item', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    }));
    
    setMyItems(axios.get('https://localhost:8080/user/request', {
      'Content-Type': 'application/json',
      'withCredentials': true,
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    }));
  })

//3개만 뿌리기 (createdat 순 정렬)
  return (
    <div id="mypage-body">
      <div id="mypage-info">
        <div id="mypage-left">
          <img id="mypage-info-img" src={`${img.src}`} alt=""></img>
          <button id="alter-info-btn" onClick={() => history.push('/alter')}>회원정보 수정</button>
        </div>
        <div id="mypage-right">
          <div id="mypage-info-name">{name}</div>
          <div id="mypage-info-nickname">{nickname}</div>
          <div id="mypage-info-email">{email}</div>
        </div>
      </div>
      <div id="mypage-bottom">
        <div id="mypage-items">
          <div id="mypage-items-title">내 게시물 목록</div>
          {
            myRequests.map(requests => 
              <PrevWTitle img={requests.img}
              title={requests.title}
              item_id={requests.id}/>
              // db에 저장되는 형태 보고 다시 수정 필요
            )
          }
          <button className="see-more-btn">더 보기</button>
        </div>
        <div id="mypage-requests">
          <div id="mypage-requests-title">내 요청 목록</div>
          {
            myItems.map(items => 
              <PrevWTitle img={items.img}
              title={items.title}
              item_id={items.id}/>
              // db에 저장되는 형태 보고 다시 수정 필요
            )
          }
          <button className="see-more-btn">더 보기</button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;