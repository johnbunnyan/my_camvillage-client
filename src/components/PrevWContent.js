import React from 'react';
import { useHistory } from "react-router-dom";

//글 목록 미리보기 (썸넬 + 제목 + 가격+ 내용) PrevWContent

function PrevWContent({ image, title, price, id, description, nickname }) {
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
  const history = useHistory();

  function handleClick(event) {
    history.push(`/item/${event.target.id}`);
  }
  
  return (
    <div className="prevwcontent-body">
      <div className="preview-img-container">
        <img className="preview-img" src={image} alt={`item #${id}`}></img>
      </div>
      <div className="prevwcontent-info">
        <div className="preview-title" id={id} onClick={handleClick}>{title}</div>
        <div className="prevwcontent-nicknameprice">{nickname} | {price}원</div>
        <div className="prevwcontent-description">{description}</div>
      </div>
    </div>
  );
}

export default PrevWContent;