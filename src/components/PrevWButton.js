import React from 'react';

//수신 요청 미리보기 (썸넬 + 제목 +  버튼 or 내 응답) PrevWButton

function PrevWButton({ img, title, item_id, status }) {
  //props로 받을 정보: img src, alt
  //글 제목
  //내가 응답한 여부 -> 응답했으면 내 응답 보여주고 눌리지 않도록 하기
  const statusContent = '';

  if (status === 1) statusContent = '요청을 승낙하였습니다.';
  else if (status === 2) statusContent = '요청을 거절하였습니다.';

  return (
    <div className="prevwbutton-body">
      <img id={`${img.id}`} src={`${img.src}`} alt={`${img.alt}`}></img>
      <div id={`${item_id}`}>{title}</div>
      {status
        ? <div>{statusContent}</div>
        : <div>
          <button className="ok-btn">승낙</button>
          <button className="no-btn">거절</button>
        </div> // false: 버튼 보여주기
      }
    </div>
  );
}

export default PrevWButton;