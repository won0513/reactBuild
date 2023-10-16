import React from 'react';
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import imgRecm from '../img/recm.png';


function Example () {
  
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
        
        <header id="header">
          <p id="logo">민법을 적용하는 법</p>
          <Menubar/>
          </header>
        <nav id="nav">&nbsp;</nav>
        <div id="section">
        <div class="main_image">
            <img src={imgRecm} alt="추천화면" width={1000} style={{border:'1.5px solid #e6c619'}}/>
        </div>
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer style={{backgroundColor:'#EEEEEE'}}>관련 사이트 | 최공</footer>
      </div>
    )
}

export default Example;