import React, { Component } from 'react';
import './App.scss';
// import GameStart from './components/GameStart';
import API from './utils/API';
import Match from './Match';
import axios from "axios";



class App extends Component {
  state = {
    searched : false,
    cards: [],
    query: "",
    matches: [],
    nutrition: {},
    name: "",
    calculators : {
      calories: (ratio,grams) => {return ratio*grams}
    },
    keto : {
      protein: {
        grams: 0,
        calories: 4
      },
      carbs: {
        grams: 0,
        calories: 4
      },
      fiber: {
        grams: 0,
        calories: 4
      },
      netCarbs : {
        grams: 0,
      },
      fat: {
        grams: 0,
        calories: 9
      },
    },
    total: {
      grams: () => {},
      calories: 0
    },
    ratios: {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  };
  submitCheck = event => {
    if(event.key === "Enter"){
        this.handleFormSubmit(event);
    }
  }
  mathPercent = num => {
    return parseFloat(num*100) + `%`;
  }
  mathRound = value => {
    return Math.round((value) * 100) / 100
  } 
  handleCalc = () => {
    const nutrition = this.state.keto;
    const protein = nutrition.protein.calories;
    const fat = nutrition.fat.calories;
    const carbs = nutrition.netCarbs.calories;
    const total = fat + carbs + protein;
    const ratios = {
      fat: this.mathRound(fat/total),
      carbs: this.mathRound(carbs/total),
      protein: this.mathRound(protein/total)
    }
    this.setState({
      ratios: ratios, 
      total: {
        grams: this.mathRound(total),
        calories: this.mathRound(protein/4 + fat/9 + carbs/4)
    }});
    console.log(ratios);


  }
  handleInputChange = event => {
    this.setState({query : event.target.value}, res => {
    console.log(this.state.query);
    if(this.state.query){
      API.getResults(this.state.query).then(res => {
        if(res.data.hits.length > 0){
          console.log(res.data.hits[0].fields.item_name);
          const newMatches = [];
          for(let i = 0; i < 8; i++){
            const match = {
              name: res.data.hits[i].fields.item_name,
              id: res.data.hits[i]._id
            }
            newMatches.push(match);
            this.setState({matches : newMatches});
          }
          console.log(this.state.matches);          

        } else {
        }
      });
    }
    });
    if(event.keyCode === "a"){
        // this.handleFormSubmit(event)
    }
}

loadNutrition = (query) => {
  API.getNutrition(query).then( res => {
    console.log(res);
    if(res){
      this.setState({
        searched : true,
        name: res.data.item_name,
        nutrition: res.data,
        keto: {
          fat: {
            grams: res.data.nf_total_fat,
          },
          carbs: {
            grams: res.data.nf_total_carbohydrate,
          },
          fiber: {
            grams: res.data.nf_dietary_fiber,
          },
          netCarbs : {
            grams: res.data.nf_total_carbohydrate - res.data.nf_dietary_fiber,
          },
          protein: {
            grams: res.data.nf_protein,
            calories: res.data.nf_protein*4
          }
        }
      });
    }

  }).then( res => {
    this.handleCalc();
  });
}
handleFormSubmit = event => {
  let query;
  if(this.state.query){
    query = this.state.query;
    this.loadNutrition(query);

  } else {
    // query = "eggs"
  }
  
}

componentDidMount(){

}


  render() {
    return (
      <div className="content-wrap">
      <section className="search-section">
        <input className="search-query" placeholder="Begin Typing" onKeyPress={this.submitCheck} onChange={this.handleInputChange}/>
        <button className="form-submit" onClick={this.handleFormSubmit}>Search</button>
        {this.state.matches.length > 0 ? (
        <div className="results">
          {this.state.matches.map(card => (
          <Match 
            id = {card.id}
            name = {card.name}
            clicked = {this.loadNutrition()}
          />
          ))}
        </div>
        ) : (
          <div className="results">
          </div>
        )}

      </section>
      {this.state.searched ? (

      <section className="calc-section">
      <h1>{this.state.name}</h1>
        <table>
          <tbody>
            <tr>
              <th>Nutrient</th>
              <th>Grams</th>
              <th>Calories</th>
            </tr>
          <tr className="fat">
            <td>Fat: </td>
            <td className="grams">{this.state.keto.fat.grams} grams</td>
            {/* <td>{this.state.keto.fat.calories} calories</td> */}
            <td>{this.state.calculators.calories.apply(this.state.keto.fat.grams, 4)} calories</td>

            </tr>
            <tr className="sub-row">
              <td>Total Carbs: </td>
              <td className="grams">{this.state.keto.carbs.grams} grams</td>
              <td>{this.state.keto.carbs.calories} calories</td>
            </tr>
            <tr>
              <td className="sub-row">Fiber: </td>

              <td className="grams">{this.state.keto.fiber.grams} grams</td>
              <td>{this.state.keto.fiber.calories} calories</td>
            </tr>
            <tr>
            <td>Net Carbs: </td>

              <td className="grams">{this.state.keto.netCarbs.grams} grams</td>
              <td>{this.state.keto.netCarbs.calories} calories</td>
            </tr>
            <tr>
            <td>Protein: </td>

              <td className="grams">{this.state.keto.protein.grams} grams</td>
              <td>{this.state.keto.protein.calories} calories</td>
            </tr>
            <tr>
              <td>TOTAL: </td>
              <td>{this.state.total.grams}  grams</td>
              <td>{this.state.total.calories} calories</td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
        <div className="keto-results">
          <div>Protein: {this.mathPercent(this.state.ratios.protein)}</div>
          <div>Carbs: {this.mathPercent(this.state.ratios.carbs)}</div>
          <div>Fat: {this.mathPercent(this.state.ratios.fat)}</div>
        </div>

        </section>
        ) : (
          <div></div>
        )}
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