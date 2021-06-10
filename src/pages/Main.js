import React, { useState } from 'react'

function Main() {
  //하드 코딩된 메인 이미지 데이터로 추후에는 db에서 가져오기로
  //db 저장 형태에 따라 이미지 파라미터는 변할 수 있으니 id, src, alt는 최소한으로 필요할 듯
  const img = [
    {
      id: 0,
      src: "https://www.rei.com/media/3ee1090b-fb1d-406e-9ba7-9bc5b0cec97d?size=784x588",
      alt: 'mainimg1'
    },
    {
      id: 1,
      src: "https://images-na.ssl-images-amazon.com/images/I/61F42n-VslL._AC_SL1500_.jpg",
      alt: 'mainimg2'
    },
    {
      id: 2,
      src: "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9736.png",
      alt: 'mainimg3'
    }
  ]
  const [displayImgNum, setDisplayImgNum] = useState(0);

  function moveLeft() {
    if (displayImgNum === 0) setDisplayImgNum(2);
    else setDisplayImgNum(displayImgNum - 1);
  }

  function moveRight() {
    if (displayImgNum === 2) setDisplayImgNum(0);
    else setDisplayImgNum(displayImgNum + 1);
  }

  return (
    <div id="main-body">
      <button onClick={() => moveLeft()}>{'<'}</button>
      <img id={img[displayImgNum].id} src={img[displayImgNum].src} alt={img[displayImgNum].src} />
      <button onClick={() => moveRight()}>{'>'}</button>
    </div>
  );
}

export default Main;