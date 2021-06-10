import React, { useEffect, useState } from 'react';
import { userSignUp } from '../actions/index';
import { Link, withRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function Signup(props) {

  const [UserId, setUserId] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Name, setName] = useState('');
  const [NickName, setNickName] = useState('');
  const [Email, setEmail] = useState('');
  const [ErrorMessagePW, setErrorMessagePW] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
    
  }

  useEffect(() => {
    console.log(ConfirmPassword)
  if(Password !== ConfirmPassword){
    setErrorMessagePW('비밀번호확인이 일치하지 않습니다.')
  } else {
    setErrorMessagePW('');
  }
  },[ConfirmPassword])

  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }
  const onNickNameHandler = (e) => {
    setNickName(e.currentTarget.value)
  }
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }
  const handleSignUp = () => {
    console.log('userId', UserId, 'password', Password)

    const isTrue = UserId !== '' && Password !== '';

    if (!isTrue) {
      setErrorMessage('모든 항목을 입력하세요');
    } else {
      setErrorMessage('');
      dispatch(userSignUp(UserId, Password, NickName, Name, Email))
      console.log('회원가입에 성공했습니다');
      props.history.push('/')
    }
  }

  return (
    <div id='LoginPage'>
    <center>
      <div>로고이미지 띄우기</div>
      <div>
        <span>아이디:  </span>
        <input type='signupId' onChange={onUserIdHandler}></input>
      </div>
      <div>
        <span>비밀먼호:   </span>
        <input type='signupPassword' onChange={onPasswordHandler}></input>
      </div>
      <div>
        <span>비밀먼호 확인:   </span>
        <input type='signupConfirmPassword' onChange={onConfirmPasswordHandler}></input>
      </div>
      <Route
         render={() => {
          if (ErrorMessagePW !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorMessagePW}
                  </div>
              );
          }
      }}
      />
      <div>
        <span>닉네임:   </span>
        <input type='signupNickname' onChange={onNickNameHandler}></input>
      </div>
      <div>
        <span>이름:   </span>
        <input type='signupName' onChange={onNameHandler}></input>
      </div>
      <div>
        <span>이메일:   </span>
        <input type='signupEmail' onChange={onEmailHandler}></input>
      </div>
      <div>
        <Link to='/user/login'>기존회원이신가요 ?</Link>
      </div>
      <button className='btnlogin' type='submit' onClick={handleSignUp}>
        로그인
      </button>
      <Route
         render={() => {
          if (ErrorMessage !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorMessage}
                  </div>
              );
          }
      }}
      />
    </center>
  </div>
  );
}

export default withRouter(Signup);