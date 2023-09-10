import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


/*function App() {
  // state
  const [data, setData] = useState({})

  console.log('실행')
  useEffect(() => 
    {
    	fetch("/users", {headers: {
        Accept: "application / json",
      },}).then(
          console.log("접속")
        ).then(
          response => response.json()
        ).then(
          data => {
            // 받아온 데이터를 data 변수에 update
            setData(data);
          }
        ).catch(
          (err) => console.log(err)
        )
    }, [])
  return (
    <div className='App'>
      <h1>test 하는 중..</h1>
      <div>
        {}
        { (typeof data.id === 'undefined') ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>loding...</p>,
          <p> n </p>
        ) : (
          <p>{data.name}</p>
        )}
      </div>
    </div>
  )
}


export default App;*/



import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js';
import Search from './components/search.js';
import Search_detail from './components/search_detail.js';
import Tab from './components/tab.js';
import Article_category from './components/article_category.js'
import Test from './components/test.js'
import Recommand from './components/recommand.js';
import Login from './components/login';
import Signup from './components/signup';
function App() {
  return (
    <div className="App">
				<Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search/:query/:option" element={<Search/>}/>
          <Route path="/search/:kind/:query/:option" element={<Search_detail/>}/>
          <Route path="/tab" element={<Tab/>}/>
          <Route path="/category/:kind/:c1/:c2" element={<Article_category/>}/>
          <Route path="/recommand" element={<Recommand/>}/>
          <Route path="/precedent/detail/:num/:p" element={<Test/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
				</Routes>
    </div>
  );
}

export default App;
