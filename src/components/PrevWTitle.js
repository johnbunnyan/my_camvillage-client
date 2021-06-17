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

  function handleImageURL(image) {
    if(image) {
      return (<img src={`${process.env.REACT_APP_API_URL}/${image}`}></img>)
    }
  }
  
  return (
    <div className="prevwtitle-body">
      <div className="preview-img-container">
        {handleImageURL(image)}
      </div>
      <div className="preview-title" id={id} onClick={handleClick}>{title}</div>
    </div>
  );
}

export default PrevWTitle;