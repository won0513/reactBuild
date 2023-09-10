import React from 'react';
import Menubar from '../elements/menubar';
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
function Recommand () {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState({});
  const [check, setCheck] = useState("0");
  const onUiChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e) => {
    // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
    e.preventDefault();
    setCheck('submit');
    const formData = new FormData();
    formData.append('input', userInput)
    console.log(formData);
    axios.post('/pan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res)=> setResult(res.data)).then(typeof result !== 'undefined' && (console.log(result)))
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
          <form onSubmit={handleSubmit}>
            <textarea onChange={onUiChange} name="input" cols="50" rows="5" value={userInput} placeholder="여기에 써주세요~"></textarea>
            <input className="btn" type="submit" value="완료"/>
          </form>
          {check === 'submit' && (
            typeof result.pan_list === 'undefined' ? (
              <p>loading...</p>) : (
                <table class="table table-hover fontFt">
                <thead><tr><th id="t1">번호</th><th>판시사항</th></tr></thead>
                <tbody>
                  {result.pan_list.map((r) => {
                    return (
                      <tr>
                        <td>{r[0]}</td>
                        <td>
                        {r[1].map((s) => {
                          return (
                            <p>{s}</p>
                          )
                        })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                </table>
              ))}
        </div>
        <aside id="aside">&nbsp;</aside>
        <footer></footer>
      </div>
    )
}

export default Recommand;