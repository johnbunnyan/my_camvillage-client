import axios from 'axios';
import React, { useEffect, useState } from 'react'
require("dotenv").config();

function Main() {
  const [displayImg, setDisplayImg] = useState([]);
  const [displayImgNum, setDisplayImgNum] = useState(0);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/main`,
    {
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then(res => {
      setDisplayImg(res.data.map(i => i.image))
    })
    .catch(e => console.log(e));
  }, [])
  
  function moveLeft() {
    if (displayImgNum === 0) setDisplayImgNum(displayImg.length - 1);
    else setDisplayImgNum(displayImgNum - 1);
  }

  function moveRight() {
    if (displayImgNum === 3) setDisplayImgNum(0);
    else setDisplayImgNum(displayImgNum + 1);
  }

  return (
    <div id="main-body">
      <button onClick={() => moveLeft()}>{'<'}</button>
      <div id="main-img-container">
        <img src={process.env.PUBLIC_URL + displayImg[displayImgNum]} alt="main" />
      </div>
      <button onClick={() => moveRight()}>{'>'}</button>
    </div>
  );
}

export default Main;