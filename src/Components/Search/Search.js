import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

function Search(props) {

  return (<div>
    <form  id="formSearch" onSubmit={props.handleClick}>
      <input type="text" id="userName" className="input-search" onChange={props.handleUserName} name="userName" value={props.userName} required="required"/>
      <DatePicker  id="datepicker" className="input-search" selected={props.startDate} onChange={props.handleChange} name="startDate" dateFormat="LL"/>
      <input className="search" type="submit" value="Search"/>
    </form>
  </div>);
}

export default Search;
