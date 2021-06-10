// import
import axios from "axios";

// action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETCATEGORY = "SETCATEGORY";
export const SETQUERYSTRING = "SETQUERYSTRING";
export const SETRESULTS = "SETRESULTS";
export const SIGNUP = 'SIGNUP';

// 나중에 필요할 것 같아 미리 생성해 놓음
const DOMAIN = "https://localhost:8080"

// actions creator functions
export const userLogin = (user_id, password) => {
  /* 원할한 테스트를 위하여 서버와 연동하는 부분을 주석 처리하고 더미데이터로 테스트 진행 중
  const data = 
  axios
  .post('https://localhost:8080/user/login',
  {
    user_id: user_id,
    password: password
  },
  {
    'Content-Type': 'application/json',
    withCredentials:true,
  })
  .then((res) => res.data)
  .catch((e) => {
    console.log(e);
  })
  */
  // test완료 후 지울 코드//
  const data = {user_id: user_id, password: password};
  return {
    type: LOGIN,
    payload: {
        isLogin: true,
        userInfo: data,
    }
  }
}

export const userSignUp = (user_id, password, name, nickname, email) => {
  /* 원활한 테스트를 위하여 서버와 연동하는 부분을 주석처리하고 더미데이트로 테스트 진행 중
  const data = 
  axios
  .post('https://localhost:8080/user/signup',
  {
    user_id: user_id,
    password: password,
    name: name,
    nickname: nickname,
    email: email,
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
  */
 const data = {user_id: user_id, password: password, 
  name: name, nickname: nickname, email: email}

  return {
    type: SIGNUP,
    payload: {
      isLogin: false,
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

export const setResults = (searchResults) => {
  return {
    type: SETRESULTS,
    payload: {
      search: { searchResults }
    }
  }
}