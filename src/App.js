import React, { Component } from 'react';
import Wakatime from './components/Wakatime/Wakatime';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Coding activity Last 7 days</h1>
        <Wakatime/>
      </div>
    );
  }
}

export default App;
