import React from 'react';

//발신 요청 미리보기 (썸넬 + 제목 + 상태) PrevWStatus

function PrevWStatus({ img, title, item_id, status }) {
  //props로 받을 정보: img src, alt
  // img = { id, src, alt }
  //글 제목
  //응답 내용
  // 상대방이 아직 답을 보내지 않았어요!
  // 상대방이 요청을 거절했어요!
  // 상대방이 요청을 승낙했어요! -> 나중에 이메일 보여줄 수 있게
  const statusContent = '';

  if (status === 0) statusContent = '상대방이 아직 답을 보내지 않았어요!';
  else if (status === 1) statusContent = '상대방이 요청을 거절했어요!';
  else if (status === 2) statusContent = '상대방이 요청을 승낙했어요!';

  return (
    <div className="prevwstatus-body">
      <img id={`${img.id}`} src={`${img.src}`} alt={`${img.alt}`}></img>
      <div id={`${item_id}`}>{title}</div>
      <div className="prevwstatus-status">{statusContent}</div>
    </div>
  );
}

export default PrevWStatus;