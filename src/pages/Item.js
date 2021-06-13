import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";

// not found api 추가
function Item() {
  const user_id = useSelector(state => state.userInfo.user_id);
  const post_id = window.location.pathname.slice(6);
  const [itemInfo, setitemInfo] = useState({});
    //   {
    //     "id": PK,
    //     "userId": "userId",
    //     "nickname": "nickname",
    //     "user_image": "user_image",
    //     "title": "title",
    //     "description": "description",
    //     "brand": "brand",
    //     "price": "price",
    //     "hashtag": "hashtag",
    //     "image": "image",
    //     "createdAt": "createdAt",
    //     "updatedAt": "updatedAt",
    //     "categoryId": "categoryId"
    // }
  const { id, title, description, brand, price, hashtag, image, category, userId } = itemInfo;
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/item/${post_id}`,
    {
      post_id: post_id
    })
    .then(res => setitemInfo(res.data))
    .catch(e => console.log(e));
  }, [post_id])

  console.log(itemInfo)
  
  function sendRequest() {
    console.log('send a request')
    axios.post('http://localhost:4000/item/request',
    {
      post_id: post_id,
      user_id: user_id
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
  }

  return (
    <div id="item-body">
      <img id="item-img" src={image} alt={`item #${id}`}></img>
      <div>
          <div id="item-title">{title}</div>
          <div id="item-user">
              <div>{userId}</div>
          </div>
          <Route
           render={() => {
            if (hashtag) {
                return (
                  <div id="item-hashtag"> 해시태그: 
                    {hashtag.map(tag => <span>#{tag}</span>)}
                  </div>
                );
            } else {
              return <div id="item-hashtag">해시태그: </div>
            }
        }}
        />
          <div id="item-info">
            <div id="item-category">{'카테고리: ' + category}</div>
            <div id="item-brand">{'브랜드: ' + brand}</div>
            <div id="item-price">{'가격: ' + price + '원'}</div>
            <div id="item-description">{'특이사항: ' + description}</div>
          </div>
          <button id="item-request-btn" onClick={sendRequest}>신청</button>
      </div>
    </div>
  );
}

export default Item;