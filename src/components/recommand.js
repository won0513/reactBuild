import React from 'react';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

import { Link } from 'react-router-dom';
import LoadingModal from '../elements/LoadingModal';
function Recommand () {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState({});
  const [check, setCheck] = useState("0");
  const onUiChange = (e) => {
    e.target.style.height = '0px';
    let scrollHeight = e.target.scrollHeight;
    console.log(scrollHeight);
    let borderTop = e.target.style.borderTop;
    let borderBottom = e.target.style.borderBottom;
    e.target.style.height = (scrollHeight + borderTop + borderBottom) + "px";
    setUserInput(e.target.value);

  };
  const handleSubmit = (e) => {
    // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
    
    e.preventDefault();
    setCheck('submit');
    const formData = new FormData();
    formData.append('input', userInput)
    console.log(formData);
    
    const _startTime = Date.now();
    console.log(_startTime)
    setResult({});
    axios.post('/pan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res)=> setResult(res.data)).then(typeof result.pan_list !== 'undefined' && (
     console.log(result), console.log('소요 시간: ', Date.now() - _startTime)))
    
  };
    return(
      <div>
        <header id="header">
          <p id="logo">민법을 적용하는 법</p>
          <Menubar/>
          <p id="login">&nbsp;</p>
          </header>
        <nav id="nav">&nbsp;</nav>
        <div id="section">
          <div style={{backgroundColor:'#EEEEEE', display:'flex', borderRadius: '10px 10px 10px 10px / 10px 10px 10px 10px', position: 'absolute', left:'50%', marginLeft: -550, width:500, height:700}}>
          <form style= {{fontSize:28, margin: 'auto'}} onSubmit={handleSubmit}>
            <textarea spellcheck="false" style={{fontSize:20, margin: 'auto'}} id='recommandInput' onChange={onUiChange}  name="input" cols="45" rows="1" value={userInput} placeholder="상황을 입력해주세요"></textarea>
            <input className='b' type="submit" value="결과 보기"/>
          </form>
          </div>
          {(
            typeof result.pan_list === 'undefined' ? (
              <>
              {((check === 'submit') && <LoadingModal/>)}
              <div style={{backgroundColor:'#EEEEEE', display:'flex', borderRadius: '10px 10px 10px 10px / 10px 10px 10px 10px', 
              position: 'absolute', left:'50%', marginLeft: 50, width:500, height:700, paddingTop:317, paddingLeft:227, fontSize:80}}>
                  ?
                </div>
                </>) : (
                <div style={{ display:'inline-block', position: 'absolute', left:'50%', marginLeft: 50}}>
                  
                  {result.pan_list.map((r, idx) => {
                    return (
                      <p className='block'>
                        <Link style={{textDecoration: "none" ,color:'black', margin: 'auto'}} to={'/precedent/detail/' + r[0] + '/' + 1}>
                        {r[1].map((s) => {
                            return (
                              <p style={{margin: 'auto', fontSize: '15px'}}>{s}</p>
                            )
                        })}
                        </Link>
                      </p>
                    )
                  })}
                        
                </div>
              ))}
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer></footer>
      </div>
    )
}

export default Recommand;


/*<table class="table table-hover fontFt">
<thead><tr><th id="t1">번호</th><th>판시사항</th></tr></thead>
<tbody>
  {result.pan_list.map((r) => {
    return (
      <tr>
        <td>{r[0]}</td>
        <td>
        {r[1].map((s) => {
          return (
            <Link style={{textDecoration: "none" , color:'black'}} to={'/precedent/detail/' + r[0] + '/' + 1}>{s}</Link>
          )
        })}
        </td>
      </tr>
    )
  })}
</tbody>
</table>*/