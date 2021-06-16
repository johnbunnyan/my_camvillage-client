import React, { useEffect, useState } from 'react';
import axios from "axios";
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
      handleError('ErrorPassword', '비밀번호가 일치하지 않습니다.')
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
    if (Email) {
      const checkEmail = checkEm.exec(Email);
      if (checkEmail) {
        handleError('ErrorEmail', '')
      } else {
        handleError('ErrorEmail', '이메일 형식에 맞지 않습니다.')
      }
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

      axios
        .post('http://localhost:4000/user/signup',
          {
            user_id: UserId,
            password: Password,
            name: Name,
            nickname: NickName,
            email: Email, //user image default image
          },
          {
            headers: {
              'Content-Type': 'application/json',
              WithCredentials: true,
            }
          })
        .then((res) => {
          console.log(res.data)
          dispatch(userSignUp(res.data))
        })
        .then((res) => {
          console.log('회원가입에 성공했습니다');
          props.history.push('/')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <div id='signup-body'>
    <center>
      <div>로고이미지 띄우기</div>
      <div className="signup-field">
        <span>이름:</span>
        <input type='signupName' name="Name" onChange={onChange}></input>
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
      </div>
      <div className="signup-field">
        <span>아이디:</span>
        <input type='signupId' name="UserId" onChange={onChange}></input>
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
      </div>
      <div className="signup-field">
        <span>비밀번호:</span>
        <input type='signupPassword' name="Password" onChange={onChange}></input>
      </div>
      <div className="signup-field">
        <span>비밀번호 확인:</span>
        <input type='signupConfirmPassword' name="ConfirmPassword" onChange={onChange}></input>
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
      </div>
      <div className="signup-field">
        <span>닉네임:</span>
        <input type='signupNickname' name="NickName" onChange={onChange}></input>
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
      </div>
      <div className="signup-field">
        <span>이메일:   </span>
        <input type='signupEmail' name="Email" onChange={onChange}></input>
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
      </div>
      <div id="signup-btn">
        <Link to='/user/login'>기존에 등록된 계정이 있습니다.</Link>
        <button className='btnsignup' type='submit' onClick={handleSignUp}>회원가입</button>
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
    </center>
  </div>
  );
}

export default withRouter(Signup);