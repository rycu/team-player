import React, { Component } from 'react';
import logo from '../images/logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>This will be team-player</h2>
        </div>
        <p>
          However, for now it is not a lot.
        </p>
      </div>
    );
  }
}

export default App;