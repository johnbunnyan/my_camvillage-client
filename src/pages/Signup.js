import React, { useEffect, useState } from 'react';
import { userSignUp } from '../actions/index';
import { Link, withRouter, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

function Signup(props) {

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    UserId: '',
    Password: '',
    ConfirmPassword: '',
    Name: '',
    NickName: '',
    Email: '',
  })
  const { UserId, Password, ConfirmPassword, Name, NickName, Email } = inputs;

  const [errorInputs, setErrorInputs] = useState({
    ErrorAll: '',
    ErrorId: '',
    ErrorPassword: '',
    ErrorName: '',
    ErrorNickName: '',
    ErrorEmail: '',
  })
  const { ErrorAll, ErrorId, ErrorPassword, ErrorName, ErrorNickName, ErrorEmail } = errorInputs;

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

  // 정규식
  const checkWord = /\W/;
  const checkEm = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  useEffect(() => {
    if (Password !== ConfirmPassword) {
      handleError('ErrorPassword', '비밀번호, 비밀번호확인란이 일치하지 않습니다.')
    } else {
      handleError('ErrorPassword', '');
    }
  }, [ConfirmPassword, Password])

  useEffect(() => {
    const checkId = checkWord.exec(UserId);
    if (checkId) {
      handleError('ErrorId', '아이디란에 허용되지 않은 특수문자가 입력되었습니다.')
    } else {
      handleError('ErrorId', '')
    }
  }, [UserId])

  useEffect(() => {
    const checkNickName = checkWord.exec(NickName);
    if (checkNickName) {
      handleError('ErrorNickName', '닉네임에 허용되지 않은 특수문자가 입력되었습니다.')
    } else {
      handleError('ErrorNickName', '')
    }  
  }, [NickName])

  useEffect(() => {
    const checkName = checkWord.exec(Name); 
    if (checkName) {
      handleError('ErrorName', '이름란에 허용되지 않은 특수문자가 입력되었습니다.')
    } else {
      handleError('ErrorName', '')
    }
  }, [Name])

  useEffect(() => {
    const checkEmail = checkEm.exec(Email);  
    if (checkEmail) {
      handleError('ErrorEmail', '')
    } else {   
      handleError('ErrorEmail', '이메일 형식에 맞지 않습니다.')
    }
  }, [Email])

  const handleSignUp = () => {
    console.log('userId', UserId, 'password', Password)

    const isTrue = UserId !== '' && Password !== '' &&
                  NickName !== '' && Name !== '' && Email !== '';

    if (!isTrue) {
      handleError('ErrorAll', '모든 항목을 입력하지 않았습니다.')
    } else {
      handleError('ErrorAll', '')
      dispatch(userSignUp(UserId, Password, NickName, Name, Email))
      console.log('회원가입에 성공했습니다');
      props.history.push('/')
    }
  }

  return (
    <div id='signup-body'>
    <center>
      <div>로고이미지 띄우기</div>
      <div>
        <span>아이디:  </span>
        <input type='signupId' name="UserId" onChange={onChange}></input>
      </div>
      <Route
         render={() => {
          if (ErrorId !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorId}
                  </div>
              );
          }
      }}
      />
      <div>
        <span>비밀먼호:   </span>
        <input type='signupPassword' name="Password" onChange={onChange}></input>
      </div>
      <div>
        <span>비밀먼호 확인:   </span>
        <input type='signupConfirmPassword' name="ConfirmPassword" onChange={onChange}></input>
      </div>
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
      <div>
        <span>닉네임:   </span>
        <input type='signupNickname' name="NickName" onChange={onChange}></input>
      </div>
      <Route
         render={() => {
          if (ErrorNickName !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorNickName}
                  </div>
              );
          }
      }}
      />
      <div>
        <span>이름:   </span>
        <input type='signupName' name="Name" onChange={onChange}></input>
      </div>
      <Route
         render={() => {
          if (ErrorName !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorName}
                  </div>
              );
          }
      }}
      />
      <div>
        <span>이메일:   </span>
        <input type='signupEmail' name="Email" onChange={onChange}></input>
      </div>
      <div>
      <Route
         render={() => {
          if (ErrorEmail !== '') {
              return (
                  <div className='alert-box'>
                      {ErrorEmail}
                  </div>
              );
          }
      }}
      />
        <Link to='/user/login'>기존회원이신가요 ?</Link>
      </div>
      <button className='btnsignup' type='submit' onClick={handleSignUp}>
        회원가입
      </button>
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
    </center>
  </div>
  );
}

export default withRouter(Signup);