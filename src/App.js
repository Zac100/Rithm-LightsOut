import React, { Component } from 'react';
import Game from './Game';
import './App.css';

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div>
        <h3>JUAAAANNS OUT</h3>
        <div className="App">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
