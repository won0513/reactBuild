import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home.js';
import Search from './components/search.js';
import Recommand from './components/recommand';
import Article_category from './components/article_category';
import Login from './components/login';
import Search_detail from './components/search_detail';

function App() {
  return (
    <div className="App">
				<Routes>
          <Route path="/" element={<Home/>}/>
          <Route path= {"search/:query/:option"} element={<Search />} />
          <Route path={'recommand'} element={<Recommand/>} />
          <Route path={'category/:kind/:c1/:c2'} element={<Article_category/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'serch/:kind/:query/:option/:page'} element={<Search_detail/>} />
				</Routes>
    </div>
  );
}

export default App;