// import
import axios from "axios";
import reducer from "../reducers/reducer";

// action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETCATEGORY = "SETCATEGORY";
export const SETQUERYSTRING = "SETQUERYSTRING";
// export const SETRESULTS = "SETRESULTS";
export const SIGNUP = 'SIGNUP';
export const ALTER = 'ALTER'
export const SETTOKEN = 'SETTOKEN';
export const USERREQUEST = 'USERREQUEST';
export const USERREQUESTED = 'USERREQUESTED';

// 나중에 필요할 것 같아 미리 생성해 놓음
const DOMAIN = "http://localhost:8080"

// actions creator functions
export const userLogin = (user_id, password) => {
  // 원할한 테스트를 위하여 서버와 연동하는 부분을 주석 처리하고 더미데이터로 테스트 진행 중
  //    data가 어떻게 들어오냐에 따라 accesstoken 항목 추가해야 할 것 같습니다.
  const data = 
  axios
  .post('http://localhost:4000/user/login',
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

  // test완료 후 지울 코드//
  // const data = {user_id: user_id, password: password,
  //   name: 'dummyname', nickname: 'dummynickname', email: 'dummyemail'};
  return {
    type: LOGIN,
    payload: {
        isLogin: true,
        userInfo: data,
    }
  }
}

export const userSignUp = (user_id, password, name, nickname, email) => {
  // 원활한 테스트를 위하여 서버와 연동하는 부분을 주석처리하고 더미데이트로 테스트 진행 중
  const data = 
  axios
  .post('http://localhost:4000/user/signup',
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

export const userAlter = (user_id, password, name, nickname, email) => {
//  원활한 테스트를 위하여 서버와 연동하는 부분을 주석처리하고 더미데이트로 테스트 진행 중
  const data = 
  axios
  .post('http://localhost:4000/user/alter',
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

  // const data = {user_id: user_id, password: password, 
  //   name: name, nickname: nickname, email: email}
  return {
    type: ALTER,
    payload: {
      userInfo: data,
    }
  }
}

export const userLogout = () => {
  axios
  .post('http://localhost:4000/user/logout',
  {
    'Content-Type': 'application/json',
    'withCredentials': true,
  })
  .then(res => res) // 없어도 되는지?
  .catch((e) => {
    console.log(e);
  })

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
  .get('http://localhost:4000/user/request',
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
      refreshToken('/??')
    } 
    return {
      type: userRequest,
      payload: {
        request: res.data
      }
    }
  })
  .catch((e) => {
    console.log(e)
  })
  
}

export const userRequested = () => {

}

const refreshToken = (DOMAIN) => {
  axios
  .get('http://localhost:4000/user'+DOMAIN,
  {
    withCredentials: true,
  })
  .then((res) => {
    if(res.data.message !== 'ok') {
      const message = 'refresgToken만료, 재 로그인 하세요.'
      console.log(message);
    } else {
      setToken(res.data.data.accessToken)
      return res;
    }
  })
}

export const setToken = (token) => {
  return {
    type: setToken,

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

// export const setResults = (category, queryString) => {
//   const data = 
//     axios
//     .post('http://localhost:8080/search',
//       {
//         category: category,
//         queryString: queryString
//       })
//     .then(res => res.data)
//     .catch(e => {
//       console.log(e);
//       });

//   return {
//     type: SETRESULTS,
//     payload: {
//       search: { searchResults: data }
//     }
//   }
// }