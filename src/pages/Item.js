import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setCategory, setQueryString } from '../actions';

require("dotenv").config();
// not found api 추가
function Item() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { user_id, stateNickname } = useSelector(state => {
    return {
      user_id: state.userInfo.user_id,
      stateNickname: state.userInfo.nickname,
    }
  });

  const post_id = window.location.pathname.slice(6);
  const [itemInfo, setItemInfo] = useState({});

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
  const { id, title, description, brand, price, hashtag, category, nickname, image} = itemInfo;
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/item/${post_id}`,
    {
      post_id: post_id
    })
    .then(res =>{
      setItemInfo(res.data);
    })
    .catch(e => console.log(e));
  }, [post_id])

  function sendRequest() {
    console.log('send a request')
    axios.post(`${process.env.REACT_APP_API_URL}/item/request`,
      {
        post_id: post_id,
        user_id: user_id
      })
      .then(res => {
        console.log('item=', res)
      }
      )
      .catch(e => console.log(e));
  }

  function handleClickPost(e) {
    dispatch(setQueryString(e.target.value));
    dispatch(setCategory('hashtag'));
    history.push(`/search?q=${e.target.value}&cat=hashtag`)
  }
    
  function handleImageURL(image) {
    return `${process.env.REACT_APP_API_URL}/${image}`
  }

  return (
    <div id="item-body">
      <div className="item-img-container">
        <img className="item-img" src={handleImageURL(image)} alt={`item #${id}`}></img>
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
                  {hashtag.map(tag => <button value={tag.name} onClick={handleClickPost}>#{tag.name}</button>)}
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
        <Route
          render={() => {
            if (stateNickname !== nickname) {
              return (
                <div className="btn-container">
                  <button id="item-request-btn" onClick={sendRequest}>신청</button>
                </div>
              )
            }
          }}
        />
      </div>
    </div>
  );
}

export default Item;