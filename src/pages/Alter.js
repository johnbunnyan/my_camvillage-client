import React, { useEffect, useState } from 'react';
import axios from "axios";
import { userAlter } from '../actions/index';
import { withRouter, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import imageCompression from "browser-image-compression";

function Alter() {
  const history = useHistory();
  const state = useSelector((state) => state)
  const accessToken = useSelector(state => state.accessToken);

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
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

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
      handleSubmit();
    }
  }

  function handleSubmit() {
    console.log("압축 시작");
  
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    imageCompression(imgFile, options)
    .then(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(1)
        axios
        .post(`${process.env.REACT_APP_API_URL}/user/alter`,
        handleDataForm(base64data),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(res => {
          console.log(res.data);
          dispatch(userAlter(res.data))
          history.push(`user/mypage`)
        })
      }
    })
    .catch(e => console.log(e));
  }

  const handleDataForm = dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg");
  
    const formData = new FormData();
    formData.append("user_image", file);
    for (const prop in inputs) {
      formData.append(prop, inputs[prop]);
    }
    return formData;
  };
  
  function handleImage(event) {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  };

  return (
    <div id='alter-body'>
      <div id='alter-info'>
        <div id='alter-img'>
          <div id="alter-img-container">
            <img src={imgBase64}></img>
          </div>
          <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={handleImage}></input>
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
            <input type="password" name="Password" onChange={onChange}></input>
          </div>
          <div>
            <label htmlFor="ConfirmPassword">비밀번호 확인:</label>
            <input type="password" name="ConfirmPassword" onChange={onChange}></input>
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