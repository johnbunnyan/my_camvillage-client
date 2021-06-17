import React, { useEffect, useState } from 'react';
import axios from "axios";
import { userAlter } from '../actions/index';
import { withRouter, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function Alter() {
  const history = useHistory();
  const state = useSelector((state) => state)
  // console.log('Alter state = ', state)
  
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    UserId: state.userInfo.user_id,
    Password: '',
    ConfirmPassword: '',
    Name: state.userInfo.name,
    NickName: state.userInfo.nickname,
    Email: state.userInfo.email,
  })
  const { UserId, Password, ConfirmPassword, Name, NickName, Email } = inputs;

  const [errorInputs, setErrorInputs] = useState({
    ErrorAll: '',
    ErrorPassword: '',
  })
  const { ErrorAll, ErrorPassword } = errorInputs;

  const onChange = (e) => {
    const {value, name} = e.currentTarget;
    console.log(e.currentTarget)
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleError = (name, value) => {
    setErrorInputs({
      ...errorInputs,
      [name]: value,
    })
  }

  useEffect(() => {
    if (Password !== ConfirmPassword) {
      handleError('ErrorPassword', '비밀번호가 일치하지 않습니다.')
    } else {
      handleError('ErrorPassword', '');
    }
  }, [ConfirmPassword, Password])

  const handleAlter = () => {
  
    console.log('userId', UserId, 'password', Password, 'nickname', NickName, 'Name', Name, 'Email', Email)

    const isTrue = UserId !== '' && Password !== '' &&
      NickName !== '' && Name !== '' && Email !== '';

    if (!isTrue) {
      handleError('ErrorAll', '모든 항목을 입력하지 않았습니다.')
      console.log(errorInputs)
    } else {
      handleError('ErrorAll', '')
      console.log(errorInputs)
      axios
      .put(`${process.env.REACT_APP_API_URL}/user/alter`,
      {
        user_id: UserId,
        password: Password,
        nickname: NickName,
        email: Email,
      },
      {
        headers: {
          'Authorization': `Bearer ${state.accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        dispatch(userAlter(res.data))
      })
      .then((res) => {
        console.log('회원정보수정에 성공했습니다');
        history.push('/user/mypage')
      })
      .catch((e) => {
        console.log(e)
      })
    }
    }
  

  return (
    <div id='alter-body'>
      <div id='alter-info'>
        <div id='alter-img'>
          <img alt="user_image"></img>
          <button id="alter-img-btn">사진 추가/변경</button>
        </div>
        <div id='alter-input'>
          <div id='alter-name'>
            <div id='alter-name-label'>이름:</div>
            <div id='alter-name-display'>{Name}</div>
          </div>
          <div>
            <label htmlFor="UserId">아이디:</label>
            <input name="UserId" defaultValue={UserId} onChange={onChange}></input>
          </div>
          <div>
            <label htmlFor="NickName">닉네임:</label>
            <input name="NickName" defaultValue={NickName} onChange={onChange}></input>
          </div>
          <div>
            <label htmlFor="Email">이메일:</label>
            <input name="Email" defaultValue={Email} onChange={onChange}></input>
          </div>
          <div>
            <label htmlFor="Password">비밀번호:</label>
            <input name="Password" onChange={onChange}></input>
          </div>
          <div>
            <label htmlFor="ConfirmPassword">비밀번호 확인:</label>
            <input name="ConfirmPassword" onChange={onChange}></input>
          </div>
        </div>
      </div>
      <div id="alter-btn">
        <button onClick={handleAlter}>수정하기</button>
        <Route
          render={() => {
            if (ErrorPassword !== '') {
              return (
                <div className='alert-box'>
                  {ErrorPassword}
                </div>
              );
            }
          }}
        />
        <Route
          render={() => {
            if (ErrorAll !== '') {
              return (
                <div className='alert-box'>
                  {ErrorAll}
                </div>
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(Alter);