import axios from 'axios'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import imageCompression from "browser-image-compression";

require("dotenv").config();
function Upload() {
  const history = useHistory();
  const user_id = useSelector(state => state.userInfo.user_id);

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	
  const [inputs, setInputs] = useState({
    user_id: user_id,
    title: '',
    hashtag: [],
    category: '',
    brand: '',
    price: 0,
    description: ''
  });

  const { hashtag } = inputs;
  const accessToken = useSelector(state => state.accessToken);
  const itemCategory = useSelector(state => state.itemCategory);

  const handleChange = (e) => {
    const {value, name} = e.currentTarget;
    console.log(value, name);
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
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
        axios
        .post(`${process.env.REACT_APP_API_URL}/item/upload`,
        handleDataForm(base64data),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(res => {
          console.log(res);
          console.log('upload successful')
          history.push(`${res.data.posts[0].post_user.postId}`)
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
    formData.append("image", file);
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

  function handleImageURL() {
    if (imgBase64) return (<img src={imgBase64}></img>)
  }

  function removeTag(i) {
    const newHashtag = [...hashtag];
    newHashtag.splice(i, 1);
    setInputs({
      ...inputs,
      hashtag: newHashtag,
    });
  };

  function inputKeyDown(event) {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const val = event.target.value;
    if (event.key === "Enter" && val) {
      event.preventDefault();
      if (hashtag.find(tag => tag === val)) return;
      setInputs({
        ...inputs,
        hashtag: [...hashtag, val],
      });
      event.target.value = null;
      console.log(event.target.value)
      
    } else if (event.key === "Backspace" && !val) {
      removeTag(hashtag.length - 1);
    }
  };

  return (
    <form id="upload-body" onSubmit={handleSubmit}>
      <div id="upload-img">
        <div id="upload-img-container">
          {handleImageURL()}
        </div>
        <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={handleImage}></input>
      </div>
      <div id="upload-form">
        <div id='upload-form-title'>
          <label htmlFor="title">제목:</label>
          <input name="title" id="title" onChange={handleChange} required />
        </div>
        <div id='upload-form-hashtag'>
          <label htmlFor="hashtag">해시태그:</label>
          <div>
            <input name="hashtag" id="hashtag" onKeyDown={inputKeyDown} />
            <ul>            
              {
                hashtag.map((tag, i) => (
                  <li key={tag}>
                    {tag}
                    <button onClick={() => {removeTag(i)}}>x</button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div id='upload-form-category'>
          <label htmlFor="category">카테고리: </label>
          <select name="category" onChange={handleChange}>
            {
              itemCategory.map(i => (
                <option value={i}>{i}</option>
              ))
            }
          </select>
        </div>
        <div id='upload-form-brand'>
        <label htmlFor="brand">브랜드: </label>
        <input name="brand" id="brand" onChange={handleChange} required />
        </div>
        <div id='upload-form-price'>
          <label htmlFor="price">가격: </label>
          <input name="price" id="price" onChange={handleChange} required />
        </div>
        <div id='upload-form-description'>
          <label htmlFor="description">특이사항: </label>
          <textarea name="description" id="description" rows="4" onChange={handleChange} required />
        </div>
      </div>
      <div className="btn-container">
        <input id="upload-btn" type="submit" value="등록"></input>
      </div>
    </form>
  );
}
export default Upload;