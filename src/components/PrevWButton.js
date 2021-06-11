import React, { useState } from 'react';

//수신 요청 미리보기 (썸넬 + 제목 +  버튼 or 내 응답) PrevWButton

function PrevWButton({ image, title, id, confirmation }) {
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

  if (confirmation === '1') setstatusMessage('상대방이 요청을 거절했어요!');
  else if (confirmation === '2') setstatusMessage('상대방이 요청을 승낙했어요!');

  return (
    <div className="prevwbutton-body">
      <img className="prevwbutton-img" src={`${image}`} alt={`item #${id} image`}></img>
      <div id={`${id}`}>{title}</div>
      {(confirmation !== '0')
        ? <div className="prevwsbutton-msg">{statusMessage}</div>
        : <div className="prevwsbutton-btn">
          <button className="ok-btn">승낙</button>
          <button className="no-btn">거절</button>
        </div>
      }
    </div>
  );
}

export default PrevWButton;