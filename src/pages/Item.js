import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";

// not found api 추가
function Item() {
  const user_id = useSelector(state => state.userInfo.user_id);
  const post_id = window.location.pathname.slice(6);
  const [itemInfo, setItemInfo] = useState({});
  const [image, setImage] = useState("");

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
  const { id, title, description, brand, price, hashtag, category, nickname } = itemInfo;
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/item/${post_id}`,
    {
      post_id: post_id
    })
    .then(res =>{
      if (res.data.images) {
        let buff = new Buffer(res.data.images[0], "base64");
        let text = buff.toString("ascii");
        setImage(`data:image/png;base64,${text}`)
      }
      setItemInfo(res.data)
    })
    .catch(e => console.log(e));
  }, [post_id])
  
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
      <div className="item-img-container">
        <img className="item-img" src={image} alt={`item #${id}`}></img>
      </div>
      <div id="item-info-container">
          <div id="item-title">{title}</div>
          <div id="item-user">작성자: {nickname}</div>
          <hr></hr>
          <Route
           render={() => {
            if (hashtag) {
              return (
                <div className="item-info">
                  <label htmlFor="item-hashtag">해시태그:</label>
                  {hashtag.map(tag => <div>#{tag.name}</div>)}
                </div>
              );
            } else {
              return <label htmlFor="item-hashtag">해시태그:</label>  
            }
          }}
        />
        <div className="item-info">
          <label htmlFor="category">카테고리: </label>
          <div id="item-category">{category}</div>
        </div>
        <div className="item-info">
          <label htmlFor="brand">브랜드: </label>
          <div id="item-brand">{brand}</div>
        </div>
        <div className="item-info">
          <label htmlFor="price">가격: </label>
          <div id="item-price">{price + '원'}</div>
        </div>
        <div className="item-info">
          <label htmlFor="description">특이사항: </label>
          <div id="item-description">{description}</div>
        </div>
          <div className="btn-container">
            <button id="item-request-btn" onClick={sendRequest}>신청</button>
          </div>
      </div>
    </div>
  );
}

export default Item;