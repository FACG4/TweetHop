import React from 'react';
import './style.css';

function Result(props) {
  return (
  < li className = "result card" >
    <p>{props.text}</p>
    <img className="post_image" alt="post" src={props.post_image}/>
    <hr/>
    <div className="time">{props.time}</div>
  </li>)
}
export default Result;
