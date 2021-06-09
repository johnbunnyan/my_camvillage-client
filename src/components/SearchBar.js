import axios from 'axios';
import React, { useState } from 'react'

function SearchBar() {
  const [queryString, setQueryString] = useState('');
  const [category, setCategory] = useState('title');

  function handleSrchClk(category, queryString) {
    console.log(category, queryString)
    // axios.post('http://localhost:8080/search')
    // .then()
    // .then(response => this.props.history.push('/search/'))
  }

  return (
    <div className="search-bar">
      <select onChange={(event) => setCategory(event.target.value)}>
        <option value="title">제목</option>
        <option value="nickname">닉네임</option>
        <option value="hashtag">해쉬태그</option>
      </select>
      <input onChange={(event) => setQueryString(event.target.value)} className="search-input" type="text" />
      <button onClick={() => handleSrchClk(category, queryString)} className="search-button">
        검색
      </button>
    </div>
  )
}

export default SearchBar;