// import
import axios from "axios";

// action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETCATEGORY = "SETCATEGORY";
export const SETQUERYSTRING = "SETQUERYSTRING";
export const SIGNUP = 'SIGNUP';
export const ALTER = 'ALTER'
export const SETTOKEN = 'SETTOKEN';
export const USERREQUEST = 'USERREQUEST';
export const USERREQUESTED = 'USERREQUESTED';

// 나중에 필요할 것 같아 미리 생성해 놓음
const DOMAIN = "http://localhost:4000"

// actions creator functions
export const userLogin = (data) => {
  console.log(data)
  const {id, user_id, name, nickname, email} = data;
  return {
    type: LOGIN,
    payload: {
        isLogin: true,
        userInfo: {id, user_id, name, nickname, email},
        accessToken: data.accessToken,
    }
  }
}

export const userSignUp = (user_id, password, name, nickname, email) => {
  // 원활한 테스트를 위하여 서버와 연동하는 부분을 주석처리하고 더미데이트로 테스트 진행 중
  const data = 
  axios
  .post(DOMAIN + '/user/signup',
  {
    user_id: user_id,
    password: password,
    name: name,
    nickname: nickname,
    email: email, //user image default image
  },
  {
    headers:{
      'Content-Type': 'application/json',
      WithCredentials: true,
    }
  })
  .then((res) => res.data)
  .catch((e) => {
    console.log(e)
  })

//  const data = {user_id: user_id, password: password, 
//   name: name, nickname: nickname, email: email}

  return {
    type: SIGNUP,
    payload: {
      isLogin: false,
      userInfo: data,
    }
  }
}

  export const userAlter = (data) => {

    const {id, user_id, nickname, email} = data;
      return {
        type: ALTER,
        payload: {
          userInfo: data,
        }
      }
    }

export const userLogout = () => {
  return {
    type: LOGOUT,
    payload: {
      isLogin: false,
      userInfo: null,
      notifications: 0
    }
  }
}

export const userRequest = (accessToken) => {
  //원활한 테스트를 위하여 서버와 연동하는 부분을 주석처리하고 더미데이트로 테스트 진행 중
  const data = 
  axios
  .get('https://localhost:4000/user/request',
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then((res) => {
    if(res.data.message !== 'ok'){
      const message = 'accessToken만료, refresh 토큰 요청';
      console.log(message);
      return userRequested(refreshToken());   
    } 
    return {
      type: USERREQUEST,
      payload: {
        requestLists: res.data
      }
    }
  })
  .catch((e) => {
    console.log(e)
  })
  
}

export const userRequested = (accessToken) => {
  const data = 
  axios
  .get('https://localhost:4000/user/requested',
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then((res) => {
    if(res.data.message !== 'ok'){
      const message = 'accessToken만료, refresh 토큰 요청';
      console.log(message);
      return userRequested(refreshToken());
    } 
    return {
      type: USERREQUESTED,
      payload: {
        requestededLists: res.data
      }
    }
  })
  .catch((e) => {
    console.log(e)
  })
  
} 

const refreshToken = () => {
  axios
  .get('https://localhost:8080/user/refreshToken',
  {
    withCredentials: true,
  })
  .then((res) => {
  })
}

export const setCategory = (category) => {
  return {
    type: SETCATEGORY,
    payload: {
      search: { category }
    }
  }
}

export const setQueryString = (queryString) => {
  return {
    type: SETQUERYSTRING,
    payload: {
      search: { queryString }
    }
  }
}

// const onSubmit = async () => {
//   actionImgCompress(data.avatar[0].file);
// };

// export const compressImg = async () => (dispatch, fileSrc) => {
//   console.log("압축 시작");

//   const options = {
//     maxSizeMB: 0.2,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true,
//   };

//   imageCompression(fileSrc, options)
//   .then(res => {
//     const reader = new FileReader();
//     reader.readAsDataURL(res);
//     reader.onloadend = () => {
//       const base64data = reader.result;
//       handlingDataForm(base64data);
//     }
//   })
//   .catch(e => console.log(e))
// };

// const handlingDataForm = async dataURI => {
//   // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
//   const byteString = atob(dataURI.split(",")[1]);

//   // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   const blob = new Blob([ia], {
//     type: "image/jpeg"
//   });
//   const file = new File([blob], "image.jpg");

//   // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
//   // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
//   const formData = new FormData();
//   formData.append("representative_avatar", file);

//   // 필요시 더 추가합니다.
//   formData.append("name", "nkh");
//   formData.append("email", "noh5524@gmail.com");

//   try {
//     const changeAvatar = await apis.auth.changeUserAccount(formData);
//     alert(changeAvatar.status);
//   } catch (error) {
//     alert(error.response.data.errors);
//   }
// };