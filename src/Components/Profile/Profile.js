import React from 'react';
import './Style.css';
import sort from './sort.png';

function Profile(props) {
  return (
    <React.Fragment>
    <div className="grid-container">
      <div className="avatar"> <img alt="profile" src={props.src}/></div>
      <div className="userName">{props.userName}</div>
      <div className="startDate">{props.startDate}</div>
    </div>
    <button className="sort" onClick={props.reverse}>Reverse order<img className="sortimg" src={sort} alt="" /></button>
    </React.Fragment>
  )
}
export default Profile;
