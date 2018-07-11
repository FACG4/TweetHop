import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

function Search(props) {

  return (<React.Fragment>
    <form onSubmit={props.handleClick}>
      <input type="text" id="userName" onChange={props.handleUserName} required="required"/>
      <DatePicker  id="datepicker"selected={props.startDate} onChange={props.handleChange} dateFormat="LL"/>
      <input className="search" type="submit" value="Search"/>
    </form>

    {
      (props.error !== '')
        ? <h1>
            {props.error}</h1>
        : null
    }
      </React.Fragment>);
}

export default Search;
