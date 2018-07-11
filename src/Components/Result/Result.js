import React from 'react';
import './style.css';

function Result(props) {
  return (
  < li className = "result card" >
    <p>{props.text}</p>
    <hr/>
    <div className="time">{props.time}</div>
  </li>)
}
export default Result;
