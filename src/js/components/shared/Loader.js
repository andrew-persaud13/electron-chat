import React from 'react';

import './Loader.scss'
function Loader(props) {
  return (
  <div className="spinner">
    <div className="rect1"></div>
    <div className="rect2"></div>
    <div className="rect3"></div>
    <div className="rect4"></div>
    <div className="rect5"></div>
  </div>
  );
}

export default Loader;