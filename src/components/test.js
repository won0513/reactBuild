import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router";
import Search_box from './search_box.js';
import Menubar from '../elements/menubar';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

function Tabel({p_list}) {
    return (
        <table class="table align-middle fontFt left">
                <thead><tr><th id="t1">구분</th><th>내용</th></tr></thead>
                <tbody>
                    {p_list.map((pl) => {
                        return(
                            <tr>
                                <td class="align-middle"><p class="widthTh">{pl[0]}</p></td>
                                <td class="align-middle">
                                    {pl[1].map((p) => {
                                        return (
                                            <p>{p}</p>
                                        )
                                    })}
                                </td>
                            </tr>
                        )}
                    )}
                </tbody>
        </table>
    )
}

function Nav({name_list, total, num, p}) {
    const [page, setPage] = useState(p);
    console.log('현재 페이지', page)
    let last_num = page*10;
    
    if (total < last_num) {
      last_num =  total;
    }
    let [curList, setCurList] = useState(name_list.slice((page-1)*10, last_num));
    console.log('nav', name_list)
    const Paging = () => {
        const handlePageChange = (page) => {
          setPage(page);
          last_num = page*10;
          if (total < last_num) {
            last_num =  total;
          }
          console.log(last_num)
          setCurList(name_list.slice((page-1)*10, last_num))
          console.log("test, curList:", curList)
          console.log("test, page2:", page)
          //type === "search" &&(window.location.href = "/search/" + kind + "/" + word + "/" + option + "/" + page)
        };
      
        return (
          <div>
          <Pagination
            class="widthFt"
            activePage={page} // 현재 페이지
            itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={total} // 총 아이템 갯수
            pageRangeDisplayed={3} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
          </div>
        );
      };


    return (
        <div className='fontFt'>
        <ul>
            {curList.map((n) => {
            return (
                <li>{n[0] === num ? (
                <Link  style={{ textDecoration: "none" }} id ="active-li">{ n[1] }</Link>
            ) : (
            <Link  style={{ textDecoration: "none" }} onClick={() => window.location.href = '/precedent/detail/' + n[0] + '/' + page}>{ n[1] }</Link>
                
            )}</li>
            )
        })}

        </ul>
        <Paging/>
        </div>
    )
}

function Test() {
  let [searchData, setSearchData] = useState({});
  const {num, p} = useParams();
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "/precedent/detail/" + num
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
      <p id="login">&nbsp;</p>
      </header>
    <nav id="nav">
    {typeof searchData.p_dic === 'undefined' ? (
        <p> </p>
        ) : (
            <Nav name_list={searchData.p_dic.name_list} total={searchData.p_dic.total} num={num} p={p}/>
        )}
    </nav>
    <div id="section">
        {typeof searchData.p_dic === 'undefined' ? (
            <p>loading...</p>
        ) : (
            <Tabel p_list={searchData.preceList[0]}/>
        )}
    </div>
    <aside id="aside">&nbsp;</aside>
    <footer></footer>
  </div>
    );

};

export default Test;