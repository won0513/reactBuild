import { useParams } from "react-router";
import axios from 'axios'
import { useState, useEffect } from 'react';

function Search() {
  const [searchData, setSearchData] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "/product/search?word=" + params.word
      );
       console.log(result.data);
       setSearchData(result.data.result);
    }
    fetchData();
  }, [])};

export default Search;