import { LOGIN, LOGOUT, SETCATEGORY, SETQUERYSTRING, SETRESULTS } from "../actions/index";
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  let newSearch;

  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, action.payload);

    case LOGOUT:
      return Object.assign({}, state, action.payload);

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
    
    default:
      return state;
  }
}

export default reducer;