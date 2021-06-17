import React from 'react';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Alter from './pages/Alter';
import Item from './pages/Item';
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
require("dotenv").config();

//미리보기 컴포넌트화:
//마이페이지 내글 미리보기 (썸넬 + 제목) PrevWTitle
//수신 요청 미리보기 (썸넬 + 제목 + 버튼 or 내 응답) PrevWButton
//발신 요청 미리보기 (썸넬 + 제목 + 상태) PrevWStatus
//글 목록 미리보기 (썸넬 + 제목 + 가격+ 내용) PrevWContent

function App() {

  const {isLogin, userInfo} = useSelector((state) => {
    return {
      isLogin: state.isLogin,
      userInfo: state.userInfo,
    };
  })
  return (
    <Router>
      <Route 
        render={() => {
          const pathname = window.location.pathname;
          console.log(pathname);
          if (pathname !== '/user/login' && pathname !== '/user/signup') return <Nav />
        }}
      />
      <Switch>
        <Route path='/main' render={() => <Main />}>
        </Route> 
        <Route path='/user/login' render={() => <Login userInfo={userInfo}/>}>
        
        </Route> 
        <Route path='/user/signup' render={() => <Signup />}>
          
        </Route> 
        <Route path='/user/mypage' render={() => <MyPage userInfo={userInfo}/>}>
          
        </Route> 
        <Route path='/user/request' render={() => <MyRequest />}> 
          
        </Route> 
        <Route path='/user/alter' render={() => <Alter userInfo={userInfo}/>}>         
        </Route> 
        <Route
            path='/item/*'
            render={() => {
              const isNum = !/[^0-9]/.test(window.location.pathname.slice(6));
              if (isNum) { // is a number
                return <Item />
              }
              return <Upload />;
            }}
          />
        <Route path='/search*' render={() => <Search />}> 
          
        </Route> 
        <Route
            exact path='/'
            render={() => {
              if (isLogin) { // is logged in
                return <Redirect to='/main' />;
              }
              return <Redirect to='/user/login' />;
            }
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
