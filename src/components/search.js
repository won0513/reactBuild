import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router";
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import Search_title from './search_titlle.js'
import Search_conts from './search_conts.js';
import Paging from '../elements/page.js';

function Search() {
  const [searchData, setSearchData] = useState([]);
  const {query, option} = useParams();
  console.log(query);
  console.log(option);
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "/search?query=" + query + "&option=" + option
      );  
       console.log(result.data);
       setSearchData(result.data);
    }
    fetchData();
  }, [])

  
  return (
    <div>
    <header id="header">
      <p id="logo">민법을 적용하는 법</p>
      <Menubar/>
      </header>
    <nav id="nav">&nbsp;</nav>
    <div id="section">
      <Search_box opt={option} q={query}/>
        
      { (typeof searchData.a_dic === 'undefined') ? (
      // fetch가 완료되지 않았을 경우에 대한 처리
      <p>loding...</p>
      ) : (
      <div id="div">
        {String(option) !== "3"  && (
          <div>
          <Search_title name="민법 내용" num={searchData.a_dic.total}/>
          {searchData.a_dic.total > 0 ?
          (<Search_conts kind="alist" option={option} list={searchData.a_dic.name_list} word={searchData.a_dic.word} page={searchData.a_dic.page} total={searchData.a_dic.total}/>)
        :(<p>검색 결과가 없습니다.</p>)}
          </div>
          )}
        
        {String(option) !== "2"  && (
          <div>
          <Search_title name="판례" num={searchData.p_dic.total}/>
          {searchData.p_dic.total > 0 ?
          (<Search_conts kind="plist" option={option} list={searchData.p_dic.name_list} word={searchData.p_dic.word} page={searchData.p_dic.page} total={searchData.p_dic.total}/>)
          :(<p>검색 결과가 없습니다.</p>)}
          </div>
          )}
          
      </div>
      )}
    </div>
    <aside id="aside">&nbsp;</aside>
    <footer></footer>
  </div>
    );

};
/*function Search() {
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
          { (typeof data.a_dic === 'undefined') ? (
            // fetch가 완료되지 않았을 경우에 대한 처리
            <p>loding...</p>,
            <p> n </p>
          ) : (
            <p>{data.a_dic}</p>
          )}
        </div>
      </div>
    )
  }*/
  
export default Search;