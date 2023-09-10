import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

const Paging = ({kind, p, total, word, option, type, list}) => {
  const [page, setPage] = useState(1);
  let [l, setL] = useState();
  useEffect(() => 
  {
    setPage(p)
    console.log("page, page:", page)
  }, [])
  
  useEffect(() => 
  {
    setL(page)
  }, [])
  const handlePageChange = (page) => {
    setPage(page);
    
    setL(page)
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
    <p>{l}</p>
    </div>
  );
};

export default Paging;