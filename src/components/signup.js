
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Signup() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const onIdChange = (e) => {
      setId(e.target.value);
    };
    const onPwChange = (e) => {
        setPw(e.target.value);
      };
    const handleSubmit = (e) => {
        // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
        e.preventDefault();
        console.log(id);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', pw);
        console.log(formData);
        axios.post('/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        ).then((res) => typeof res.data === 'string' && (alert(res.data)));
    };
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input onChange={onIdChange} value={id} type="text" placeholder="ID" />
          <input onChange={onPwChange} type="password" placeholder="Password" />
          <input className="btn" type="submit" value="Log in" />
          <Link to="/sign-up">sign up?</Link>
        </form>
      </div>
    );
  }
  
  export default Signup;