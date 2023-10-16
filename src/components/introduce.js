import React from 'react';
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import imgPaper from '../img/paper.png';


function Introduce () {
  
  let [option, setOption] = useState("1");
  let [loginData, setLoginData] = useState("");
  let [kind, setKind] = useState("민법");
  const c = "총칙";
  let [getData, setGetData] = useState([]);

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
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&display=swap" rel="stylesheet"/>
        <header id="header">
          <p id="logo">민법을 적용하는 법</p>
          <Menubar/>
          </header>
        <nav id="nav">&nbsp;</nav>
        <div id="section" style={{fontFamily: "'Gowun Batang', serif", fontSize:80}}>
        <div class="main_image">
            <img src={imgPaper} alt="두루마리" width="470px" height="100px" style={{margin: '0px'}}/>
            <h1 class="main_image_text">서비스 소개</h1>
        </div>
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer style={{backgroundColor:'#EEEEEE'}}>관련 사이트 | 최공</footer>
      </div>
    )
}

export default Introduce;