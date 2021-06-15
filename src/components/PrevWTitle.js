import React from 'react';
import { useHistory } from "react-router-dom";

//마이페이지 내글 미리보기 (썸넬 + 제목) PrevWTitle

function PrevWTitle({ image, title, id }) {
  //   {
//     "id": PK,
//     "userId": "userId",
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
  const history = useHistory();

  function handleClick(event) {
    //redirect to 개별 게시물
    history.push(`/item/${event.target.id}`)
  }
  
  return (
    <div className="prevwtitle-body">
      <div className="preview-img-container">
        <img className="preview-img" src={image} alt={`item #${id}`}></img>
      </div>
      <div className="prevwtitle-title" id={id} onClick={handleClick}>{title}</div>
    </div>
  );
}

export default PrevWTitle;