import axios from "axios";
import React, { useState } from 'react';
import { useSelector } from "react-redux";

function YesNoButton(props) {
  const [confirmation, setConfirmation] = useState(props.confirmation);
  const user_id = useSelector(state => state.userInfo.user_id)

  function sendConfirmation(event) {
    const newConfirmation = event.target.value;
    const postId = event.target.parentElement.parentElement.previousSibling.id;
    console.log({
      id: postId,
      userId: user_id,
      confirmation: newConfirmation
    })
    //new api, post request 진행 중
    axios
    .post("http://localhost:4000/confirmation",
    {
      id: postId, // request의 아이디 찾을수 있는지 확인 필요
      userId: user_id,
      confirmation: newConfirmation
    })
    .then(res => res)
    .catch(e => {
      console.log(e)
    })
    
    setConfirmation(newConfirmation);
  }

  return (
      <div className="yesnobutton-body">
      {(confirmation !== '0')
        ? <div className="yesnobutton-msg">{(confirmation === '1') ? '승낙!' : '거절!'}</div>
        : <div className="yesnobutton-btn">
          <button className="ok-btn" value="1" onClick={sendConfirmation}>승낙</button>
          <button className="no-btn" value="2" onClick={sendConfirmation}>거절</button>
        </div>
      }
      </div>
  );
}

export default YesNoButton;