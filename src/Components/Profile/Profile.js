import React from 'react';
import './Style.css';

function Profile(props) {
  return (
    <div className="grid-container">
    <div className="avatar"> <img  src={props.src}/></div>
    <div className="userName">{props.userName}</div>
    <div className="startDate">{props.startDate}</div>

  </div>
)
}
export default Profile;
