import { LOGIN, LOGOUT, SIGNUP, SETCATEGORY, SETQUERYSTRING, SETRESULTS, ALTER } from "../actions/index";
import {USERREQUEST} from "../actions/index";
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

    case SETRESULTS:
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

    case USERREQUEST:
      console.log('userRequest action =' , action)
      return Object.assign({}, state, {
        request: action.payload.request,
    });  
    
    default:
      return state;
  }
}

export default reducer;