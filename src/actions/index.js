// action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETCATEGORY = "SETCATEGORY";
export const SETQUERYSTRING = "SETQUERYSTRING";
export const SETRESULTS = "SETRESULTS";

// actions creator functions
export const userLogin = (user_id, email, password, nickname, image) => {
  return {
    type: LOGIN,
    payload: {
        isLogin: true,
        userInfo: {user_id, email, password, nickname, image},
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