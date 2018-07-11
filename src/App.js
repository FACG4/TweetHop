import React, {Component} from 'react';
import logo from './logo.png';
import search from './search.png';
import moment from 'moment';
import axios from 'axios';
import Search from './Components/Search/Search';
import Result from './Components/Result/Result';
import Profile from './Components/Profile/Profile';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      userName: '',
      result: [],
      error:'',
      viewForm:true,
      viewResult:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.showSeacrh = this.showSeacrh.bind(this);
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
      console.log(response);
      if (response.data.message === 'Sorry, that page does not exist.') {
        this.setState({error:'User dose not exist'});
      } else if (response.data.message === 'Not authorized.') {
        this.setState({error:'The account is private'});
      } else {
        this.setState((prevState)=>{
          console.log(prevState.userName);
          return{result: response.data,
            viewForm:false,
            viewResult:true
          }
        })

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  showSeacrh() {
    this.setState((prevState)=>{
      console.log(prevState.userName);
      return{
        userName:prevState.userName,
        viewForm:!this.state.viewForm,
        // viewResult:!this.state.viewResult


      }

    })
  }

  filterData(date){
    const dateArr = date.format('MMM DD, YYYY').split(',');
    return this.state.result.filter(tweet=>{
      return tweet.created_at.includes(dateArr[0]) && tweet.created_at.includes(dateArr[1])
    })
  }

  render() {
    return(
      <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">TweetHop</h1>
      </header>
      <div>{this.state.error}</div>
      {this.state.viewForm
      ?<Search
        userName={this.state.userName}
        handleClick={this.handleClick}
        handleUserName={this.handleUserName}
        startDate={this.state.startDate}
        handleChange={this.handleChange}
      />

      : <img className="search-icon" src={search} onClick={this.showSeacrh}/>
    }
    {this.state.viewResult
      ?<React.Fragment>


       {/* {(this.filterData(this.state.startDate).length  ===0 )? <h1>no tweets</h1>:''} */}
       {this.state.result.length>0?

         <Profile src={this.state.result[0].profile_image_url} userName={this.state.userName} startDate={this.state.startDate.format('ll')}/>

       :''}
      <ul>
      {this.state.result.length>1?
        this.filterData(this.state.startDate).map((tweet, index) =>

        <Result key={index} text={tweet.text} time={tweet.created_at} />
        ):''
        //if no data at that time
      }


      </ul>
      </React.Fragment>
      :''
  }
    </div>
 )
  }
}

export default App;
