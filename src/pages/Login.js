import React, { useState } from 'react';
import axios from "axios";
import { userLogin } from '../actions/index';
import { Link, withRouter, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useSelector } from 'react-redux';

require("dotenv").config();

function Login(props) {
  const state = useSelector(state => state);
  console.log(state)
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
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/login`,
          {
            user_id: UserId,
            password: Password
          },
          {
            'Content-Type': 'application/json',
            withCredentials: true,
          })
        .then((res) => {
          console.log('login', res.data)
          dispatch(userLogin(res.data))
        })
        .then(res => {
          console.log('로그인에 성공했습니다');
          props.history.push('/')
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }
  const handleVisit = () => {
   
      setErrorMessage('');
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/login`,
          {
            user_id: 'king',
            password: 1234
          },
          {
            'Content-Type': 'application/json',
            withCredentials: true,
          })
        .then((res) => {
          console.log('login', res.data)
          dispatch(userLogin(res.data))
        })
        .then(res => {
          console.log('로그인에 성공했습니다');
          props.history.push('/')
        })
        .catch((e) => {
          console.log(e);
        })
    
  }
  const responseGoogle = (response) => {
    console.log(response.accessToken);
    console.log(response);
    axios
    .post(`${process.env.REACT_APP_API_URL}/user/login/google`,
    {
      user_id: response.profileObj.email.split('@')[0],
      nickname: response.profileObj.email.split('@')[0],
      email: response.profileObj.email,
    },
    {
      headers: {
        Authorization: `Bearer ${response.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      dispatch(userLogin(res.data))
    })
    .then(res =>{
      console.log('소셜 로그인에 성공했습니다.');
      props.history.push('/')
    })
  }
console.log(process.env.REACT_APP_GOOGLE_KEY)
  return (
    <div id='login-body'>
      <center>
        <Link to="/" id="login-title">캠빌리지</Link>
        <div className="login-field">
          <span>아이디:</span>
          <input type='text' name="UserId" onChange={onChange}></input>
        </div>
        <div className="login-field">
          <span>비밀번호:</span>
          <input type='password' name="Password" onChange={onChange}></input>
        </div>
        <div id="login-btn">
        <button onClick={handleVisit}>비회원으로 구경하기</button>
          <button onClick={handleLogin}>로그인</button>
          <Link to='/user/signup'>회원가입</Link>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_KEY}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => <button onClick={renderProps.onClick}>Login with Google</button>}
          />
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
        </div>
      </center>
    </div>
  );
}

export default withRouter(Login);