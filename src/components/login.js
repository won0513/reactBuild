
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';
function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();
    const onIdChange = (e) => {
      setId(e.target.value);
    };
    const onPwChange = (e) => {
        setPw(e.target.value);
      };
    const nav = ()=> {navigate(-1)}
    const handleSubmit = (e) => {
        // submit을 할 때 페이지 자체가 새로고침이 되는 것을 막음
        e.preventDefault();
        console.log(id);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', pw);
        console.log(formData);
        axios.post('/login', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        ).then((res) => typeof res.data === 'string' ? (alert(res.data)) : (
          //navigate(-1))
            nav)
          );
        
        navigate(-1)
    };
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='loginInput'>
            <AiOutlineUser className='loginIcon' size="50px"/><input onChange={onIdChange} value={id} type="text" placeholder="ID"/>
          </div>
          <div className='loginInput'>
            <AiOutlineLock className='loginIcon' size="50px"/><input onChange={onPwChange} type="password" placeholder="Password" />
          </div>
          <input className="btn" type="submit" value="Log in" />
          <Link to="/sign-up">sign up?</Link>
        </form>
      </div>
    );
  }
  
  export default Login;