import React, {Component} from 'react';
import logo from './logo.svg';
import moment from 'moment';
import axios from 'axios';
import Search from './Components/Search/Search';
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
    this.setState({startDate: date});
  }
  handleClick(e) {
    e.preventDefault();
    axios.get(`https://tweetshub.herokuapp.com/api/v1/usertweets/${this.state.userName}`)
    .then((response) => {
      console.log(response);
      if (response.data.errors) {
        this.setState({error:'User dose not exist'});
      } else if (response.data.error) {
        this.setState({error:'The account is private'});
      } else {
        this.setState({
          result: this.state.result.concat(response.data)
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Tweet Hop</h1>
      </header>
      <Search
         handleClick={this.handleClick}
          handleUserName={this.handleUserName}
          startDate={this.state.startDate}
           handleChange={this.handleChange}
           error={this.state.error}

      />
    </div>);
  }
}

export default App;
