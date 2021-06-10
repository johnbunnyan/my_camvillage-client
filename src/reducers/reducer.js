import { LOGIN, LOGOUT, SIGNUP } from "../actions/index";
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('Login action = ', action)
      return Object.assign({}, state, 
        {
        isLogin: action.payload.isLogin,
        userInfo: action.payload.userInfo,
      });
    
    case SIGNUP:
      console.log('SignUp action = ', action)
      return Object.assign({}, state,{
        isLogin: action.payload.isLogin,
        userInfo: action.payload.userInfo,
      })

    case LOGOUT:
      return Object.assign({}, state, action.payload);
    
    default:
      return state;
  }
}

export default reducer;