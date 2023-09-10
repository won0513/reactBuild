import React from 'react';
import { Link } from 'react-router-dom';

class Menubar extends React.Component {
  render() {
    return(
      <ul className="nav justify-content-center" id="menu">

      <li className="nav-item">
        <Link to="/" className = "text-dark nav-link" aria-current="page">홈</Link>
      </li>
      <li className="nav-item">
        <Link to="/category/article/총칙/0" className = "text-dark nav-link active">카테고리별 민법</Link>
      </li>
      <li className="nav-item">
        <Link to="/category/precedent/총칙/통칙" className = "text-dark nav-link" aria-current="page">카테고리별 판례</Link>
      </li>
      <li className="nav-item">
        <a className = "text-dark nav-link" href="{{ url_for('main.pan') }}?input=0">판례 추천</a>
      </li>
    </ul>
    )
  }
}

export default Menubar;