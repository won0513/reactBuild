import { useState, useEffect } from "react";
import axios from 'axios'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from "./table.js";
import Menubar from '../elements/menubar';
import { useParams } from "react-router";

function TabContent(props){
  console.log(props.tabContList)
  let cList2 = props.tabContList[props.tab]
  return <Nav className="me-auto">{cList2.map((c, idx)=>{
    return (<Nav.Link onClick={()=>{ 
      let url = 'http://220.120.26.206/'
      props.kind === 'article' ? (url += "/category/article" + "/" + props.tab + "/" + idx) :
      (url += "/category/precedent" + "/" + props.tab + "/" + c)
      window.location.href =url}}><span  className="fontFt">{c}</span></Nav.Link>)})}</Nav>
}

function Tab({tabList, tabContList, c1, c2, kind}) {
  let [tab, setTab] = useState(c1);
  return (
  <div><Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey={c1}>
      {tabList.map((t, idx)=> {
          console.log(t)
          let k = t;
          return (    
          <Nav.Item>
          <Nav.Link eventKey={k} onClick={()=>{setTab(t);/*window.location.href = "/article" + "/" + t + "/" + c2;*/}}><span  className="fontFt">{t}</span></Nav.Link>
          </Nav.Item>
          )
      }
      )}
  </Nav>
  <Navbar bg="light" expand="xxl">
  <Container>
  <Navbar.Brand href="#home"><span className="fontTw">{tab}</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
  <TabContent tab={tab} tabContList={tabContList} tabList={tabList} kind={kind}/>
  </Navbar.Collapse></Container></Navbar>
  </div>
  
)
}

/*<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>*/

export default function Article_category() {
    let [getData, setGetData] = useState(0);
  const {kind, c1, c2} = useParams();
  
  const url = 'http://220.120.26.206/'
  const [loginData, setLoginData] = useState("");
  const handleClick = (e) => {
    // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
    //e.preventDefault();
    axios.get('/logout'
    ).then((res) => console.log(res)).then(window.location.href = (url + '/category/' + kind + '/' +  c1 + '/' + c2));
  };
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "/" + kind + '/' + c1 +"/" + c2
      );
       console.log(result.data);
       setGetData(result.data);
    }
    async function fetchData2() {
       const login = await axios.get(
        '/checkLogin?type=' + kind
      );
       setLoginData(login.data);
    }
    
    fetchData().then(()=>fetchData2());
  }, [])

  return (
    
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
    <div>
        {(typeof getData.c_list2 === 'undefined') ? (
      // fetch가 완료되지 않았을 경우에 대한 처리
      <p>loding...</p>
      ) : ((typeof getData.c_list1 === 'undefined') || (<div>
            <Tab tabList={getData.c_list1} tabContList={getData.c_list2} c1={c1} c2={c2} kind={kind}/>
              {typeof loginData.lawBookmark === 'undefined' && typeof loginData.preceBookmark === 'undefined' ? (<p>loding...</p>) : (
                <Table list={getData.dic.name_list} total={getData.dic.total} kind={kind} 
              isLoggedIn={loginData.isLoggedIn} lawBookmark={loginData.lawBookmark}/>
              )}
            </div>
        ))}
    </div>
    </div>
    <aside id="aside">&nbsp;</aside>
    <footer></footer>
  </div>
  )
}