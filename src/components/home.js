import React from 'react';
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import LoadingModal from '../elements/LoadingModal.js';

function TabContent({tabName, tabContList, c}){
  return <Nav className="me-auto">{  
          tabContList.slice(0, 3).map((c, idx)=>{
            console.log(c)
            return (<Nav.Link onClick={()=>{ 
                      let url = ''
                      tabName === '민법' ? (url = "/category/article" + "/" + '총칙' + "/" + idx) :
                      (url = "/category/precedent" + "/" + '총칙' + "/" + c)
                    }}>
                    
                    {tabName ==='민법' ? (
                      <p style={{fontSize:'12px'}}>
                        <p>{c[0]}</p>
                        {c[1].map((s)=> <span>{s}</span>)}
                      </p>
                    ) : (<span  className="fontFt">{c[1]}</span>)}</Nav.Link>)})
      }
      </Nav>
}




function Home () {
  
  let [option, setOption] = useState("1");
  let [loginData, setLoginData] = useState("");
  let [kind, setKind] = useState("민법");
  const c = "총칙";
  let [getData, setGetData] = useState([]);


  useEffect(() => 
  {
    axios.get('/checkLogin').then((res) => setLoginData(res.data))
    async function fetchData() {
      
      const result = await axios.get(
        "/homeContents/" + c
      );
      console.log(result.data);
      setGetData(result.data);
    }
    fetchData()
  }, [c])
  const handleClick = (e) => {
    // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
    //e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    axios.get('/logout'
    ).then((res) => console.log(res)).then(window.location.href = ('/'));
  };

  
function Tab({kind, c}) {
  const tabList = ['민법', '판례'];
  return (
  <div><Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey={kind}>
      {tabList.map((t, idx)=> {
          console.log(t)
          let k = t;
          return (    
          <Nav.Item>
          <Nav.Link eventKey={k} onClick={()=>{setKind(t);}}><span  className="fontFt">{t}</span></Nav.Link>
          </Nav.Item>
          )
      }
      )}
  </Nav>
  <Navbar bg="light" expand="xxl">
  <Container>
  <Navbar.Brand href="#home"><span className="fontTw" style={{color:'rgb(170, 160, 0)'}}>{kind}</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
    
    {(kind === '민법') ? (<TabContent tabContList={getData.article} c={c} tabName={kind}/>) : (
              <TabContent tabContList={getData.precedent} c={c} tabName={kind}/>
            )}
  </Navbar.Collapse></Container></Navbar>
  </div>
  
)
}

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
          <div className="homeBlock1">
          {(typeof getData.precedent === 'undefined') ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>
            <LoadingModal/>
            
            </p>
          ) : ((typeof getData.article === 'undefined') || (
            <Tab c={c} kind={kind}/>))}
          </div>
          <div>
            <Link to='/introduce'>
            <p className="homeBlock2" style={{marginRight:100, marginTop:50}}>
                서비스 소개 바로가기
            </p>
            </Link>
            <Link to='/example'>
            <p className="homeBlock2" style={{marginTop:50}}>
                사용 방법
            </p>
            </Link>
          </div>
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer style={{backgroundColor:'#EEEEEE'}}>관련 사이트 | 최공</footer>
      </div>
    )
}

export default Home;