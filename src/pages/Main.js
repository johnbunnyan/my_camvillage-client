import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Main() {
  const [displayImg, setDisplayImg] = useState([]);
  const [displayImgNum, setDisplayImgNum] = useState(0);

  useEffect(() => {
    axios
    .get('http://localhost:4000/main',
    {
      'Content-Type': 'application/json',
      withCredentials:true,
    })
    .then(res => setDisplayImg(res.data.map(i => i.image)))
    .catch(e => console.log(e));
  }, [])

  console.log(displayImg)
  console.log(displayImg[displayImgNum])
  
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
      <img src={displayImg[displayImgNum]} alt="" />
      <button onClick={() => moveRight()}>{'>'}</button>
    </div>
  );
}

export default Main;
//