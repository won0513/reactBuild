import React from 'react';
import Header from './header.js';
import { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";

function Search_conts({list, word, total, kind, option}) {
    let [curList, setCurList] = useState([]);
    const [page, setPage] = useState(1);
    const Paging = () => {
        const handlePageChange = (page) => {
          setPage(page);
          let last_num = page*10;
          if (total < last_num) {
            last_num =  total;
          }
          setCurList(list.slice((page-1)*10, last_num))
          console.log("page, curList:", curList)
          console.log("page, page2:", page)
          console.log('page, kind', kind)
          //type === "search" &&(window.location.href = "/search/" + kind + "/" + word + "/" + option + "/" + page)
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

    console.log("search conts, kind", kind)
    console.log("search conts, word", word)
    console.log("search conts, option", option)
    
    console.log("search conts, list", list)
    useEffect(() => {
        //kind가 list이면 즉 더보기 버튼을 클릭하기 전이면 3개만, 더보기 버튼을 클릭 후일때는 10개씩
        {kind ==="alist" ? (setCurList(list.slice(0, 3))) : (kind ==="plist" ? (setCurList(list.slice(0, 3))) : (setCurList(list.slice((page-1)*10, page*10))))}

      }, [])
    console.log(curList)
    const btnList = {
        alist: <p>{total > 3 && (<button type="button" onClick={() => {
            window.location.href = "/search/" + "article" + "/" + word + "/" + option;}}>더보기</button>)}</p>,
        plist: <p>{total > 3 && (<button type="button" onClick={() => {
            window.location.href = "/search/" + "precedent" + "/" + word + "/" + option;}}>더보기</button>)}</p>,
        article: <p>
        <div>
        <Paging/>
        </div></p>,
        precedent: <p>
        <div>
        <Paging/>
        </div></p>
    }
    
    console.log("search conts, page", page);
    /*curList.map((string) => {
        return(    
        <li class="left">
        {
            string.map((str, idx) => {
               return (
                <p>
                {idx === 1 ? (
                str.map((s) => {
                    return(
                        s === word ? (
                            null
                        ) : (
                            console.log("log", s)
                        )
                    )
                })
                ) : ( null
                )}
                </p>
               )
            })
        }
        </li>
        )
    })*/

    return (
        <div class="div2">
            <ul>
            {curList.map((string) => {
                return(    
                <li class="left">
                {
                    string.map((str, idx) => {
                       return (
                        <p>
                        {idx === 0 ? (
                        str.map((s) => {
                            return(
                                s === word ? (
                                    <span class = "div2-title bold">{ s }</span>
                                ) : (
                                    <span class = "div2-title">{ s }</span>
                                )
                            )
                        })
                        ) : (
                            idx === 1 && (
                                str.map((s) => {
                                    return(
                                        s === word ? (
                                            <span class = "div2-cont bold">{ s }</span>
                                        ) : (
                                            <span class = "div2-cont">{ s }</span>
                                        )
                                        
                                    )
                                })
                            )
                        )}
                        </p>
                       )
                    })
                }
                </li>
                )
            })}
            </ul>
            {btnList[kind]}
        </div>
    )
      
}


export default Search_conts;