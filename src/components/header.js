
import { useState, useEffect } from 'react';

function Header() {
    const [word, setWord] = useState("");
    let [option, setOption] = useState("");
    const onSubmit = async () => {
      window.location.href = "/search/" + word + "/" + option;
    };

    const onOptChange = (e) => {
      setOption(e.target.value);
      console.log(option);
    };
  
    return (
     <div>
      <select name="option" id="option" onChange={onOptChange}>
                <option value="1" class="opt">통합검색</option>
                <option value="2" class="opt">민법</option>
                <option value="3" class="opt">판례</option>
      </select>
      <input
      onChange={(e) => {
      setWord(e.target.value);
      console.log(word);
      }}></input>
  
      <button
       type="button"
       onClick={() => {
       onSubmit();
       }}></button>
     </div>
    );
  }


  export default Header;