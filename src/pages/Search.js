import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrevWContent from '../components/PrevWContent';

function Search() {
  //   //category = 'title' 이면 queryString을 포함하는 title 검색
  //   //category = 'nickname' 이면 queryString 일치 nickname 검색
  //   //category = 'hashtag' 이면 queryString 일치 hashtag 검색
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const { category, queryString } = useSelector(state => state.search);
  const { nickname } = useSelector(state => state.userInfo);

  useEffect(() => {
  //   // searchResults 저장
  //   axios
  //   .post('https://localhost:8080/search',
  //     {
  //       category: category,
  //       queryString: queryString
  //     })
  //   .then(res => setSearchResults(res.data))
  //   .catch(e => {
  //     console.log(e);
  //     });

    const date = new Date();
    
    const dummyData = [
      {
        "id": 1,
        "userId": 'kimcoding', //닉네임이 안 오고 있음
        "title": '텐트 빌려드립니다',
        "description": '이쁜 텐트를 빌려드립니다',
        "brand": '캠핑브랜드',
        "price": 100000000000,
        "hashtag": ['감성캠핑', '캠핑초보', '글램핑'], // array
        "image": 'https://www.rei.com/media/3ee1090b-fb1d-406e-9ba7-9bc5b0cec97d?size=784x588',
        "createdAt": date,
        "updatedAt": date,
        "categoryId": 1
      }
    ]

    setSearchResults(dummyData)
    
    // searchMessage 저장
    if (category === 'title') { 
      //category = 'title' 이면 queryString을 포함하는 title 검색
      // 검색 결과: 텐트 (341)
      setSearchMessage(`검색 결과: '${queryString}' (${searchResults.length})`);
    } else if (category === 'nickname') {
      //category = 'nickname' 이면 queryString 일치 nickname 검색
      if (queryString === nickname) setSearchMessage(`나의 작성글 (${searchResults.length})`);
      // 캠핑조아님의 작성글
      else setSearchMessage(`'${queryString}'님의 작성글 (${searchResults.length})`);
    } else if (category === 'hashtag') {
      //category = 'hashtag' 이면 queryString 일치 hashtag 검색
      // #감성캠핑
      setSearchMessage(`#${queryString} (${searchResults.length})`);
    }
  }, [category, queryString, searchResults.length, nickname])
  
  return (
    <div id="search-body">
      <div id="search-results">
        <div id="search-message">{searchMessage}</div>
        {
          searchResults.map(({ image, title, id, description }) => 
            <PrevWContent
            image={image}
            title={title}
            id={id}
            description={description} />
          )
        }
      </div>
    </div>
  );
}

export default Search;