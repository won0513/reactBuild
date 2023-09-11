import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";


function Search_box({opt, q}) {
    const [query, setQuery] = useState("");
    let [option, setOption] = useState("");
    useEffect(() => 
    {
      setOption(opt)
      setQuery(q)
  }, [])
    console.log("searchbox, option", option)

    /*function OnSubmit(){
      useEffect(() => 
    {
      (option === '' && (opt === 'undifined' ? (setOption("1")): (setOption(opt)))).then(
        console.log('new option', option)
      ).then(
        
      query === 'undefined' && (setQuery(q))  
      ).then(
      window.location.href = "/search/" + query + "/" + option
      )
  }, [])
    }*/
    /*const promise = new Promise((resolve, reject) => {
      option === '' && (opt === 'undifined' ? (setOption("1")): (setOption(opt)))
      console.log('new option', option)
      query === 'undefined' && (setQuery(q))  
    });*/
    const navigate = useNavigate();

    const onSubmit = async () => {
      option === '' ?(window.location.href = "/search/" + query + "/" + opt ) : (
        window.location.href = "/search/" + query + "/" + option 
      )
    };

    const onOptChange = (e) => {
      setOption(e.target.value);
      console.log(option);
    };
    const optList = ['통합검색', '민법', '판례'];
    return (
     <div>
      <select name="option" id="option" onChange={onOptChange}>
      {optList.map((o, idx) => {
        return(  
          String(idx+1) === String(opt) ? (
            <option value={idx+1} class="opt" selected>{ o }</option>
            ) : (
              <option value={idx+1} class="opt">{ o }</option>
            )
        )
    })}
      </select>
      {
        q === 'undefined' ? (
          <input id="query" type="text" placeholder="검색어를 입력해 주세요"
      onChange={(e) => {
      setQuery(e.target.value);
      console.log(query);
      }}></input>
        ) : (
          <input id="query" type="text"
      onChange={(e) => {
      setQuery(e.target.value);
      console.log('q있음', query);
      }} value={query}></input>
        )
      }
      
  
      <button id="icon"
       type="button"
       onClick={() => {
       onSubmit();
       }}><i className="bi bi-search"></i></button>
     </div>
    );
  }
  



/*function Search_box() {
  // form 가져오기
 //let opt = document.getElementById("option");
 let query = document.getElementById("query");
 let formData = new FormData();
 //formData.append("opt", opt);
 formData.append("query", query);

 const SearchUp = (e) => {
  e.preventDefault();
  
  fetch("/seach", {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: new FormData(search),
  })
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      }
      throw new Error("에러 발생!");
    })
    .catch((error) => {
      alert(error);
    })
    .then((data) => {
      console.log(data);
    });
  };
    return(
          <div className="Search_box">
          <form name="sform" onSubmit={SearchUp} method="get" id="search">
              
            <input type="text" name="name" value="Bora"></input>
            <input type="text" name="surname" value="Lee"></input>
            <input type="submit"></input>
          </form>
          </div>
          
          
    )
  
}*/





export default Search_box;