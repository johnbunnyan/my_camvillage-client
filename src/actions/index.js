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