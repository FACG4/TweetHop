import React from 'react';
import './Style.css';

function Profile(props) {
  return (
    <React.Fragment>
    <div className="grid-container">
      <div className="avatar"> <img alt="profile" src={props.src}/></div>
      <div className="userName">{props.userName}</div>
      <div className="startDate">{props.startDate}</div>
    </div>
    <button onClick={props.reverse}> Sort </button>
    </React.Fragment>
  )
}
export default Profile;
