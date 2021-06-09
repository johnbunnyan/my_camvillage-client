// action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// actions creator functions
export const Login = (user_id, email, password, nickname, image) => {
  return {
    type: LOGIN,
    payload: {
        isLogin: true,
        userInfo: {user_id, email, password, nickname, image},
    }
  }
}

export const Logout = () => {
  return {
    type: LOGOUT,
    payload: {
      isLogin: false,
      userInfo: null,
      notifications: 0
    }
  }
}
