import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory, setQueryString } from '../actions';
import { useHistory } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSrchClk(event) {
    const category = event.target.previousElementSibling.previousElementSibling.value;
    const queryString = event.target.previousElementSibling.value;

    dispatch(setQueryString(queryString));
    dispatch(setCategory(category));
    console.log(category, queryString)
    history.push(`/search?q=${queryString}&cat=${category}`)
  }

  return (
    <div className="search-bar">
      <select >
        <option value="title">제목</option>
        <option value="nickname">닉네임</option>
        <option value="hashtag">해쉬태그</option>
      </select>
      <input className="search-input" type="text" />
      <button onClick={handleSrchClk} className="search-button">
        검색
      </button>
    </div>
  )
}

export default SearchBar;