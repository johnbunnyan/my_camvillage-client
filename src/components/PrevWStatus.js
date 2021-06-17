import React from 'react';
import { useHistory } from "react-router-dom";

//발신 요청 미리보기 (썸넬 + 제목 + 상태) PrevWStatus

function PrevWStatus({ image, title, id, confirmation }) {
  // {
  //   "id": PK,
  //   "userId": my id,
  //   // 물건 올린 사람 id
  //   "title": "title",
  //   "image": "image",
  //   "confirmation": '0', // '0': no response, '1': yes, '2': no
  //   "createdAt": "createdAt",
  //   "updatedAt": "updatedAt"
  // }
  const history = useHistory();
  
  function statusMessage(confirmation) {
    switch (confirmation) {
      case '0':
        return '아직 답이 없어요!';
      case '1':
        return '거절 ㅠㅠ';
      case '2':
        return '승낙 ^^';
      default:
        break;
    }
  }

  function handleClick(event) {
    //redirect to 개별 게시물
    history.push(`/item/${event.target.id}`)
  }

  function handleImageURL(image) {
    return `${process.env.REACT_APP_API_URL}/${image}`
  }

  return (
    <div className="prevwstatus-body">
      <div className="preview-img-container">
        <img className="preview-img" src={handleImageURL(image)} alt={`item #${id}`}></img>
      </div>
      <div className="preview-title" id={id} onClick={handleClick}>{title}</div>
      <div className="prevwstatus-msg">{statusMessage(confirmation)}</div>
    </div>
  );
}

export default PrevWStatus;