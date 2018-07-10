import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function Search(props){


     return (
<React.Fragment>
       <form onSubmit={props.handleClick}>
      <input type="text" className="userName" onChange={props.handleUserName} required/>
       <DatePicker
        selected={props.startDate}
        onChange={props.handleChange}
         dateFormat="LL" />
      <input className="search" type="submit" value="Search" />
    </form>

{(props.error!=='')
  ?<h1> {props.error}</h1>
  : null
}
    </React.Fragment>


  );
}

export default Search;
