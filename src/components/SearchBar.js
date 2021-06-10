import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setQueryString } from '../actions';
import { useHistory } from "react-router-dom";


function SearchBar() {
  const { category, queryString } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleQueryString(event) {
    const queryString = event.target.value;
    dispatch(setQueryString(queryString));
  }

  function handleCategory(event) {
    const category = event.target.value;
    dispatch(setCategory(category));
  }

  function handleSrchClk(category, queryString) {
    axios.post('http://camvillage.com/search', { category, queryString }) // 이 형태로 보내는 것이 맞는지?
    //search api 수정 필요
    //category = 'title' 이면 queryString을 포함하는 title 검색
    //category = 'nickname' 이면 queryString 일치 nickname 검색
    //category = 'hashtag' 이면 queryString 일치 hashtag 검색
    .then(response => {
      const searchResults = response.data; // 이 형태로 오는 것이 맞는지?
      dispatch(setResults(searchResults));
    }) // response를 store에 저장
    .then(response => history.push(`/search?q=${queryString}&cat=${category}`)) // search page 로 redirect
  }

  return (
    <div className="search-bar">
      <select onChange={handleCategory}>
        <option value="title">제목</option>
        <option value="nickname">닉네임</option>
        <option value="hashtag">해쉬태그</option>
      </select>
      <input onChange={handleQueryString} className="search-input" type="text" />
      <button onClick={() => handleSrchClk(category, queryString)} className="search-button">
        검색
      </button>
    </div>
  )
}

export default SearchBar;