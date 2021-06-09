import { LOGIN, LOGOUT } from "../actions/index";
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, action.payload);

    case LOGOUT:
      return Object.assign({}, state, action.payload);
    
    default:
      return state;
  }
}

export default reducer;