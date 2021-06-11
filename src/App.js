import React from 'react';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Alter from './pages/Alter';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyRequest from './pages/MyRequest';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Upload from './pages/Upload';

import './App.css';

import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//컴포넌트화:
//마이페이지 미리보기 (썸넬 + 제목)ThumbTitle
//수신 요청 미리보기 (썸넬 + 버튼 or 썸넬 + 내 응답)ThumbTitleStatus/ThumbTitleButton
//발신 요청 미리보기 (썸넬 + 제목 + 상태)ThumbTitleStatus
//글 목록 미리보기 (썸넬 + 제목)ThumbTitle


function App() {
  const path = window.location.pathname.slice(1);
  const {isLogin, userInfo} = useSelector((state) => {
    return {
      isLogin: state.isLogin,
      userInfo: state.userInfo
    };
  })
  
  return (
    <Router>
      { (path !== 'user/login' && path !== 'user/signup') && <Nav /> }
      <Switch>
        <Route path='/main' render={() => <Main />}>
        </Route> 
        <Route path='/user/login' render={() => <Login />}>
        
        </Route> 
        <Route path='/user/signup' render={() => <Signup />}>
          
        </Route> 
        <Route path='/user/mypage' render={() => <MyPage userInfo={userInfo}/>}>
          
        </Route> 
        <Route path='/user/request' render={() => <MyRequest />}> 
          
        </Route> 
        <Route path='/user/alter' render={() => <Alter userInfo={userInfo}/>}> 
          
        </Route> 
        <Route path='/item/upload' render={() => <Upload />}> 
          
        </Route> 
        <Route path='/search*' render={() => <Search />}> 
          
        </Route> 
        <Route
            exact path='/'
            render={() => {
              console.log(isLogin);
              if (isLogin) { // is logged in
                return <Redirect to='/main' />;
              }
              return <Redirect to='/user/login' />;
            }}
          />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
