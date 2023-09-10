import React from 'react';
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Navigate } from "react-router-dom";


function Home () {
  
  const [option, setOption] = useState("");
  const [loginData, setLoginData] = useState("");
  console.log("home, option:", option)
  useEffect(() => 
  {
    setOption("1")
    console.log("home, option:", option)
    axios.get('/checkLogin').then((res) => setLoginData(res.data))
    console.log(loginData)
  }, [])
  const handleClick = (e) => {
    // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
    //e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    axios.get('/logout'
    ).then((res) => console.log(res)).then(window.location.href = ('/'));
  };

  console.log("home, option:", option)
    return(
      <div>
        <header id="header">
          <p id="logo">민법을 적용하는 법</p>
          <Menubar/>
          <p id="login">
            {typeof loginData !== 'undefined' && (loginData.isLoggedIn === false ? (
              <Link to='/login'>로그인</Link>) : (
                <p>
                  {loginData.userId}님
                  <button onClick={handleClick}>로그아웃</button>
                </p>
              )
            )}
          </p>
          </header>
        <nav id="nav">&nbsp;</nav>
        <div id="section">
          <Search_box opt={option}/>
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer></footer>
      </div>
    )
}

export default Home;