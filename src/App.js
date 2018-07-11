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
    this.reverseArr = this.reverseArr.bind(this);
  }

  handleUserName(e) {
    this.setState({userName: e.target.value,error:''})
  }

  handleChange(date) {
    // console.log(date._d)
    // console.log(date.format('MMM DD, YYYY'))
    this.setState({startDate: date});
  }

  handleClick(e) {
    e.preventDefault();
    axios.get(`https://tweetshub.herokuapp.com/api/v1/usertweets/${this.state.userName}`)
    .then((response) => {
      if (response.data.message === 'Sorry, that page does not exist.') {
        this.setState({error:"User deson't exist"});
      } else if (response.data.message === 'Not authorized.') {
        this.setState({error:'Private Account'});
      } else {
        this.setState({
          result: response.data,
            viewForm:false,
            viewResult:true
          }
        )

      }
    }).catch((error) => {
      this.setState({
        err:'Something Went Wrong'
      })
    });
  }

  showSeacrh() {
    this.setState((prevState)=>{
      return{
        userName:prevState.userName,
        viewForm:!this.state.viewForm,
      }

    })
  }

  filterData(date){
    const dateArr = date.format('MMM DD, YYYY').split(',');
    return this.state.result.filter(tweet=>{
      return tweet.created_at.includes(dateArr[0]) && tweet.created_at.includes(dateArr[1])
    })
  }

  reverseArr(){
    this.setState({
      result:this.state.result.reverse()
    })    
  }

  render() {
    return(
      <div className="App">
      {
        !this.state.viewResult?
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="App-title">TweetHop</h2>
      </header>
      :
      <header className="App-header-small">
        <img src={logo} className="App-logo-small" alt="logo" />
        <h4 className="App-title">TweetHop</h4>
      </header>
      }

      { this.state.error !== '' 
        ? <div className="alert">{this.state.error}</div>
        : ''
      }
      {
        this.state.viewForm
        ?<Search
          userName={this.state.userName}
          handleClick={this.handleClick}
          handleUserName={this.handleUserName}
          startDate={this.state.startDate}
          handleChange={this.handleChange}
          />

        : <img className="search-icon" alt="search icon" src={search} onClick={this.showSeacrh}/>
      }
    {this.state.viewResult
      ?<React.Fragment>
       {/* {(this.filterData(this.state.startDate).length  ===0 )? <h1>no tweets</h1>:''} */}
       {this.state.result.length>0?

        <Profile
        reverse = {this.reverseArr}
        src={this.state.result[0].profile_image_url} 
        userName={this.state.userName} 
        startDate={this.state.startDate.format('ll')}
        />

       :''}
      {this.state.result.length > 0 &&
       this.filterData(this.state.startDate).length>0 ?
      <ul>
        {
        this.filterData(this.state.startDate).map((tweet, index) =>{
          const date = new Date(tweet.created_at);
          const time = `At => ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          return <Result key={index} text={tweet.text} time={time} />
        })
        }
        </ul>
        :<div className="alert">No Tweets At This Date</div>
      }
      </React.Fragment>
      :''
  }
    </div>
 )
  }
}

export default App;
