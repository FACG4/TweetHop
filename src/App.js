import React, {Component} from 'react';
// import logo from './logo.svg';
import moment from 'moment';
import axios from 'axios';
import Search from './Components/Search/Search';
import Result from './Components/Result/Result';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      userName: '',
      result: [],
      error:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
  }

  handleUserName(e) {
    console.log(e.target.value);
    this.setState({userName: e.target.value,error:''})
  }

  handleChange(date) {
    console.log(date._d)
    console.log(date.format('MMM DD, YYYY'))
    this.setState({startDate: date});
  }

  handleClick(e) {
    e.preventDefault();
    axios.get(`https://tweetshub.herokuapp.com/api/v1/usertweets/${this.state.userName}`)
    .then((response) => {
      if (response.data.errors) {
        this.setState({error:'User dose not exist'});
      } else if (response.data.error) {
        this.setState({error:'The account is private'});
      } else {
        this.setState({
          result: response.data
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  filterData(date){
    const dateArr = date.format('MMM DD, YYYY').split(','); 
    return this.state.result.filter(tweet=>{
      return tweet.created_at.includes(dateArr[0]) && tweet.created_at.includes(dateArr[1])
    })
  }  

  render() {
    return (<div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Tweet Hop</h1>
      </header>
      <Search
        handleClick={this.handleClick}
        handleUserName={this.handleUserName}
        startDate={this.state.startDate}
        handleChange={this.handleChange}
        error={this.state.error}
      />
      <ul>
      {this.state.result.length>1?
        this.filterData(this.state.startDate).map((tweet, index) =>
        
        <Result key={index} text={tweet.text} time={tweet.created_at} /> 
        ):''
        //if no data at that time
      }
      </ul>
    </div>);
  }
}

export default App;
