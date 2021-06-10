import React from 'react';
import { useHistory } from "react-router-dom";

//글 목록 미리보기 (썸넬 + 제목 + 가격+ 내용) PrevWContent

function PrevWContent({ img, title, item_id, content }) {
  //props로 받을 정보: img src, alt
  // img = { id, src, alt }
  //글 제목
  //가격
  //미리보기 (200자? + '...')
  const history = useHistory();

  function handleClick(event) {
    history.push(`/item/:${event.target.id}`)
  }
  
  return (
    <div className="prevwcontent-body">
      <img id={`${img.id}`} src={`${img.src}`} alt={`${img.alt}`}></img>
      <div id={`${item_id}`} onClick={handleClick}>{title}</div>
      <div className="prevwcontent-price">{price}</div>
      <div className="prevwcontent-content">{content}</div>
    </div>
  );
}

export default PrevWContent;