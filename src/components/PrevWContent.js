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

  function handleImageURL(image) {
    if(image) {
      return (<img src={`${process.env.REACT_APP_API_URL}/${image}`}></img>)
    }
  }
  
  return (
    <div className="prevwcontent-body">
      <div className="preview-img-container">
        {handleImageURL(image)}
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