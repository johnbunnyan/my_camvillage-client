import React, { useState } from 'react';

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
  const [statusMessage, setstatusMessage] = useState('');

  if (confirmation === '0') setstatusMessage('상대방이 아직 답을 보내지 않았어요!');
  else if (confirmation === '1') setstatusMessage('상대방이 요청을 거절했어요!');
  else if (confirmation === '2') setstatusMessage('상대방이 요청을 승낙했어요!');

  return (
    <div className="prevwstatus-body">
      <img className="prevwstatus-img" src={`${image}`} alt={`item #${id} image`}></img>
      <div id={`${id}`}>{title}</div>
      <div className="prevwstatus-msg">{statusMessage}</div>
    </div>
  );
}

export default PrevWStatus;