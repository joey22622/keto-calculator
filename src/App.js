import React, { Component } from 'react';
import './App.css';
// import GameStart from './components/GameStart';
import API from './utils/API';
import axios from "axios";



class App extends Component {
  state = {
    cards: [],
    query: "",
    nutrition: {},
    name: "",
    keto : {
      protein: {
        grams: 0,
        calories: 0
      },
      carbs: {
        grams: 0,
        calories: 0
      },
      fat: {
        grams: 0,
        calories: 0
      },
    },
    results: {
      total: 0
    }
  };
  submitCheck = event => {
    if(event.key === "Enter"){
        this.handleFormSubmit(event);
    }
  }
  handleInputChange = event => {
    this.setState({query : event.target.value}, res => {
    console.log(this.state.query);
      API.getResults(this.state.query).then(res => {
        if(res.data.hits.length > 0){
          console.log(res.data.hits[0].fields.item_name);
        } else {
          console.log("nope");
        }
      });
    });
    if(event.keyCode === "a"){
        // this.handleFormSubmit(event)
    }
}
handleFormSubmit = event => {
  let query;
  if(this.state.query){
    query = this.state.query;
  } else {
    query = "eggs"
  }
  API.getNutrition(query).then( res => {
    console.log(res.data);
    this.setState({
      name: res.data.item_name,
      nutrition: res.data,
      keto: {
        fat: {
          grams: res.data.nf_total_fat,
          calories: res.data.nf_total_fat*9
        },
        carbs: {
          grams: res.data.nf_total_carbohydrate,
          calories: res.data.nf_total_carbohydrate*4
        },
        protein: {
          grams: res.data.nf_protein,
          calories: res.data.nf_protein*4
        },
        results: {
          total : this.state.keto.fat.calories + this.state.keto.protein.calories + this.state.keto.carbs.calories
        }
      }
    });

  }).then( res => {
    this.setState({
      results : {
        total : this.state.keto.fat.calories + this.state.keto.protein.calories + this.state.keto.carbs.calories
      }
    });
    console.log(this.state.keto.results.total);
  });
}

componentDidMount(){
  API.getNutrition("eggs").then( res => {
    console.log(res.data);
    const data = {
      fat: {
        grams: res.data.nf_total_fat,
        calories: res.data.nf_total_fat*9
      },
      carbs: {
        grams: res.data.nf_total_carbohydrate,
        calories: res.data.nf_total_carbohydrate*4
      },
      protein: {
        grams: res.data.nf_protein,
        calories: res.data.nf_protein*4
      }
    }
    this.setState({
      nutrition: res.data,
      keto: {
        fat: {
          grams: res.data.nf_total_fat,
          calories: res.data.nf_total_fat*9
        },
        carbs: {
          grams: res.data.nf_total_carbohydrate,
          calories: res.data.nf_total_carbohydrate*4
        },
        protein: {
          grams: res.data.nf_protein,
          calories: res.data.nf_protein*4
        },
        results: {
          
        }
      }
    });

  }).then( res => {
    this.setState({
      results : {
        total : this.state.keto.fat.calories + this.state.keto.protein.calories + this.state.keto.carbs.calories
      }
    });
    console.log(this.state.keto.results.total);
  });

  // this.setState({nutrition : API.getNutrition("eggs")}).then( res => {
  //   console.log(this.state.nutrition);
  // });
}


  render() {
    return (
      <div className="content-wrap">
        {/* <GameStart/> */}

        <div className="header-center">
                        <input className="search-query" placeholder="search food" onKeyPress={this.submitCheck} onChange={this.handleInputChange}/>
                        <button className="formSubmit" onClick={this.handleFormSubmit}>Search</button>
                        <h1>{this.state.name}</h1>
        </div>
        <table>
          <tbody>
            <tr className="fat">
              <td className="grams">Fat: {this.state.keto.fat.grams} grams</td>
              <td>{this.state.keto.fat.calories} calories</td>
              </tr>
              <tr>
              <td className="grams">Carbs: {this.state.keto.carbs.grams} grams</td>
              <td>{this.state.keto.carbs.calories} calories</td>
              </tr>
              <tr>
              <td className="grams">Protein: {this.state.keto.fat.grams} grams</td>
              <td>{this.state.nutrition.nf_total_fat*9} calories</td>
            </tr>
            <tr>
              <td>{this.state.results.total} </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
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