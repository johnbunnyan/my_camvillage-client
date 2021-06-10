import React from 'react';
import { useHistory } from "react-router-dom";

//마이페이지 내글 미리보기 (썸넬 + 제목) PrevWTitle

function PrevWTitle({ img, title, item_id }) {
  //props로 받을 정보: img src, alt
  // img = { id, src, alt }
  //글 제목
  //가격
  //미리보기 (200자? + '...')
  const history = useHistory();

  function handleClick(event) {
    //redirect to 개별 게시물
    history.push(`/item/:${event.target.id}`)
  }
  
  return (
    <div className="prevwtitle-body">
      <img id={`${img.id}`} src={`${img.src}`} alt={`${img.alt}`}></img>
      <div id={`${item_id}`} onClick={handleClick}>{title}</div>
    </div>
  );
}

export default PrevWTitle;