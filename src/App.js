import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Spinner from './spinner/Reel';
import mechanism from './mechanism/spin_action';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      reelOne: 'cherry',
      reelTwo: 'cherry',
      reelThree: 'cherry',
      userCoin: 20,
      message: 'Clic the button to start play',
      winner: null
    }

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const {result, coins, message, winner} = mechanism(this.state.userCoin);
    this.setState({
      userCoin: coins,
      reelOne: coins !== 0 ? result[0] : 'cherry',
      reelTwo: coins !== 0 ? result[1] : 'cherry',
      reelThree: coins !== 0 ? result[2] : 'cherry',
      message,
      winner
    });


  }

  render() {
    return(
      <div id="principal" className="container mt-5">
        <div className="row text-center">
          <div className="col-12">
            <h3>You Have {this.state.userCoin} Coins</h3>
          </div>
          <div className="col-12">
            <h4 style={{color: 'green'}}>{this.state.winner && this.state.message}</h4>
            <h4 style={{color: this.state.winner===false ? 'red' : 'black'}}>{!this.state.winner && this.state.message}</h4>
          </div>
         
        </div>
        <div className="row mt-5">
          <div className="col-md-10 offset-md-1">
            <Spinner fruit = {this.state.reelOne}/>
            <Spinner fruit = {this.state.reelTwo}/>
            <Spinner fruit = {this.state.reelThree}/>
          </div>
        </div>
        <div className="row h-100 mt-5 mb-5">
            {this.state.userCoin!==0 &&
            <button 
            className="btn btn-primary mx-auto "
            onClick = {this.onButtonClick}
            >Spin</button>}

            {this.state.userCoin===0 &&
            <button 
            className="btn btn-danger mx-auto "
            onClick = {this.onButtonClick}
            >Restart</button> }
        </div>  
        
      </div>
      
    );
  }
}

export default App;
