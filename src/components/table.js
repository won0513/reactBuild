import React from 'react';
import Header from './header.js';
import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

function Table({list, total, kind, isLoggedIn, lawBookmark}) {
    let [curList, setCurList] = useState([]); //클릭됐는지(check) 여부에 따라 달라지는 리스트
    const [page, setPage] = useState(1);
    const [check, setCheck] = useState(0); //즐겨찾기 아이콘(별모양) 클릭 여부
    let htmlList = [];
    let [changeList, setChangeList] = useState([]); 
    let [result, setResult] = useState('');
    var now = new Date();	// 현재 날짜 및 시간
    function generate_cgList(islin, clist) {
      let new_l = [];
      console.log(clist)
      for (let i = 0; i < clist.length; i ++) {
          new_l[i] = '<i class="bi bi-star"></i>'
      }
      console.log(lawBookmark)
      if (islin) {
        for (let k = 0; k < lawBookmark.length; k++) {
          for (let i = 0; i < clist.length; i ++) {
            let num = clist[i][0].split('조')[0]
            if (lawBookmark[k] == num) {
              new_l[i] = '<i class="bi bi-star-fill"></i>'
              break
            }
          }
          
        }
      }
      setChangeList(new_l)
      console.log(changeList)
    }
    function getData(n){
      return new Promise( (resolve, reject) => {
        setCurList(list.slice((page-1)*10, n))
        
        console.log(n)
        console.log(list)
        console.log(curList)
        resolve(curList);
      })
    }

    useEffect(() => {
      var seconds = now.getTime();
        console.log("초 : ", seconds);
        //kind가 list이면 즉 더보기 버튼을 클릭하기 전이면 3개만, 더보기 버튼을 클릭 후일때는 10개씩
        let new_l = [];
        let last_num = page*10;
        if (total < last_num) {
          last_num =  total;
        }
        setCurList(list.slice((page-1)*10, last_num))
        console.log('curList 바뀜!!!: ', curList )
        //getData(last_num).then((curList)=> generate_cgList(isLoggedIn, curList,  last_num))
        //console.log(new_l)
        //setCurList(new_l)
    }, [])
    useEffect(() => {
      console.log('curList 바뀜!!!: ', curList )
      //kind가 list이면 즉 더보기 버튼을 클릭하기 전이면 3개만, 더보기 버튼을 클릭 후일때는 10개씩
      
      generate_cgList(isLoggedIn, curList)
        
      //getData(last_num).then((curList)=> generate_cgList(isLoggedIn, curList,  last_num))
      //console.log(new_l)
      //setCurList(new_l)
  }, [curList])
    console.log(curList)
      const Paging = () => {
        const handlePageChange = (page) => {
          setPage(page);
          let last_num = page*10;
          if (total < last_num) {
            last_num =  total;
          }
          setCurList(list.slice((page-1)*10, last_num))
          /*let l = list.slice((page-1)*10, last_num);
          setCurList(l);
          console.log(l)*/

          /*{l.length !== 0 && (
            generate_cgList(isLoggedIn, l,  last_num)
          )}*/
        };
        return (
          <div>
          <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={total} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
          </div>
        );
      };
    return (
        <div class="div2">
            <table class="table table-hover fontFt">
                <thead><tr><th id="t1"><span className="fontFt">번호</span></th><th><span className="fontFt">조목</span></th></tr></thead>
                <tbody>
            {curList.map((string, idx) => {
              console.log(string);
              console.log(changeList[idx]);
              let url = "/precedent/detail/" + string[1] + '/' + page
                return(    
                    <tr>
                        <td className="widthTh">{kind==='article'? (<span>{(page-1)*10+idx+1}</span>) : ( <span>{string[1]}</span>)}</td>
                        <td>
                          {kind==='article' ? (
                          <details>
                          <summary>{string[0]}</summary>
                          <br/>
                          <p>
                          {string[1].map((str)=> { console.log(str); return <p>{str}</p>})}</p></details>) : (
                            <span><Link to={url}  style={{ textDecoration: "none" }}>{string[2]}</Link></span>
                          )}
                          
                        </td>
                        <td>
                          {
                            typeof changeList === 'undefined' ? (<p></p>) : (
                              <span onClick={()=>{
                                //htmlList = changeList; console.log('1', htmlList); htmlList[idx] = '<i class="bi bi-star-fill"></i>'; console.log('2', htmlList); setChangeList(htmlList); console.log('3', changeList);
                                console.log('-------', idx)
                                var seconds = now.getTime();	// 초
                                console.log("초 : ", seconds);
                                console.log(changeList.slice(0,idx))
                                const result = axios.get(
                                  "/checkLaw?jo=" + string[0].split('조')[0]
                                ).then(res => (
                                  res.data.isExist ? (
                                    setChangeList(changeList.slice(0,idx).concat(['<i class="bi bi-star"></i>'], changeList.slice(idx+1, changeList.length)))
                                  ) : (
                                    setChangeList(changeList.slice(0,idx).concat(['<i class="bi bi-star-fill"></i>'], changeList.slice(idx+1, changeList.length)))

                                  )
                                )).then(()=> 
                                {var seconds = now.getTime();	// 초
                                console.log("초 : ", seconds);})
                                //setChangeList(changeList.slice(0,idx).concat([newHtml], changeList.slice(idx+1, changeList.length)))
                              }} 
                              dangerouslySetInnerHTML={{ __html: changeList[idx] }}></span>
                            )
                          }
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            <Paging/>
        </div>
    )
      
}


export default Table;