import React from 'react';
function Result(props) {
  return (<li>
    <p>{props.text}</p>
    <div>{props.time}</div>
    <hr/>
  </li>)
}
export default Result;
