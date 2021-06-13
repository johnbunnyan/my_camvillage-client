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
        return '상대방이 아직 답을 보내지 않았어요!';
      case '1':
        return '상대방이 요청을 거절했어요!';
      case '2':
        return '상대방이 요청을 승낙했어요!';
      default:
        break;
    }
  }

  function handleClick(event) {
    //redirect to 개별 게시물
    history.push(`/item/${event.target.id}`)
  }

  return (
    <div className="prevwstatus-body">
      <img className="prevwstatus-img" src={image} alt={`item #${id}`}></img>
      <div id={id} onClick={handleClick}>{title}</div>
      <div className="prevwstatus-msg">{statusMessage(confirmation)}</div>
    </div>
  );
}

export default PrevWStatus;