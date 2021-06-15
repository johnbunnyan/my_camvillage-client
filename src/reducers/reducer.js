import { LOGIN, LOGOUT, SIGNUP, SETCATEGORY, SETQUERYSTRING, ALTER } from "../actions/index";
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  let newSearch;

  switch (action.type) {
    case LOGIN:
      console.log('Login action = ', action)
      return Object.assign({}, state, 
        {
        isLogin: action.payload.isLogin,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        isGoogle: action.payload.isGoogle,
      });
    
    case SIGNUP:
      console.log('SignUp action = ', action)
      return Object.assign({}, state,{
        isLogin: action.payload.isLogin,
        userInfo: action.payload.userInfo,
      })

    case LOGOUT:
      console.log('Logout action = ', action)
      return Object.assign({}, state, {
        isLogin: action.payload.isLogin,
        userInfo: action.payload.userInfo,
      });

    case SETCATEGORY:
      newSearch = {
        ...state.search,
        ...action.payload.search
      };
      return Object.assign({}, state, {
        search: newSearch
      });
    
    case SETQUERYSTRING:
      newSearch = {
        ...state.search,
        ...action.payload.search
      };
      return Object.assign({}, state, {
        search: newSearch
      });

    case ALTER:
      console.log('Alter action = ', action)
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo,
    });  
    
    default:
      return state;
  }
}

export default reducer;