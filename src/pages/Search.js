import React from 'react';
import { useSelector } from 'react-redux';
import PrevWContent from '../components/PrevWContent';

function Search() {
  const { category, queryString, searchResults } = useSelector(state => state.search);
  const { nickname } = useSelector(state => state.userInfo);
  const searchQuery = '';

  if (category === 'title') {  //category = 'title' 이면 queryString을 포함하는 title 검색
    searchQuery = `검색 결과: '${queryString}' (${searchResults.length})`; // 검색 결과: 텐트 (341)
  } else if (category === 'nickname') {  //category = 'nickname' 이면 queryString 일치 nickname 검색
    if (queryString === nickname) searchQuery = '나의 작성글';
    else searchQuery = `'${queryString}'님의 작성글`; // 캠핑조아님의 작성글
  } else if (category === 'hashtag') {  //category = 'hashtag' 이면 queryString 일치 hashtag 검색
    searchQuery = `#${queryString}`; // #감성캠핑
  }

  return (
    <div>
      <div id="search-body">
        <div id="search-results">
          <div id="search-query">{searchQuery}</div>
          {
            searchResults.map(searchResult => 
              <PrevWContent img={searchResult.img} title={searchResult.title} item_id={searchResult.id} content={searchResult.content}/> // db에 저장되는 형태 보고 다시 수정 필요
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Search;