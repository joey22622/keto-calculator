import React, { Component } from 'react';
import './App.css';
// import GameStart from './components/GameStart';
import API from './utils/API';



class App extends Component {
  state = {
    cards: [],
    query: "",
    nutrition: {}
  };

componentDidMount(){
  API.getNutrition("eggs").then( res => {
    console.log(res);
    this.setState({nutrition: res.data.list});
    console.log(this.state.nutrition);
  });

  // this.setState({nutrition : API.getNutrition("eggs")}).then( res => {
  //   console.log(this.state.nutrition);
  // });
}


  render() {
    return (
      <div className="content-wrap">
        {/* <GameStart/> */}
      </div>
    );
  }
}

export default App;

/*
  2 options:
    - form that allows you to enter nutrition info
    - search field that permits you to search a nutrition facts API
      -APIs:
        - 


*/