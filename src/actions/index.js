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
  const { id, user_id, name, nickname, email, google } = data;
  return {
    type: LOGIN,
    payload: {
      isLogin: true,
      userInfo: { id, user_id, name, nickname, email },
      accessToken: data.accessToken,
      isGoogle: google,
    }
  }
}

export const userSignUp = (data) => {
  console.log(data)
  const { id, user_id, name, nickname, email, google } = data;
  return {
    type: SIGNUP,
    payload: {
      isLogin: false,
      userInfo: { id, user_id, name, nickname, email },
      isGoogle: google,
    }
  }
}


export const userAlter = (data) => {

  const { id, user_id, nickname, email } = data;
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
      userInfo: '',
      notifications: 0,
      accessToken: '',
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