import React, { useState } from 'react';
import { userLogin } from '../actions/index';
import { Link, withRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function Login(props) {


  const [ErrorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    UserId: '',
    Password: '',
    ErrorMessage: '',
  })

  const { UserId, Password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleLogin = () => {
    const isTrue = UserId !== '' && Password !== '';

    if (!isTrue) {
      setErrorMessage('아이디와 비밀번호 모두 입력하세요');
    } else {
      setErrorMessage('');
      dispatch(userLogin(UserId, Password))
      console.log('로그인에 성공했습니다');
      props.history.push('/')
    }
  }

  return (
    <div id='login-body'>
      <center>
        <div>로고이미지 띄우기</div>
        <div>
          <span>아이디:  </span>
          <input type='loginId' name="UserId" onChange={onChange}></input>
        </div>
        <div>
          <span>비밀번호:   </span>
          <input type='loginPassword' name="Password" onChange={onChange}></input>
        </div>
        <div>
          <Link to='/user/signup'>회원가입</Link>
        </div>
        <button className='btnlogin' type='submit' onClick={handleLogin}>
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

export default withRouter(Login);