import './App.css';

import React, { Component } from 'react';

import Header from './components/header';
import Reciept from './contrainers/reciept';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header id="navBar" title="IT Glue reciept challenge"/>
        <Reciept id="reciept"/>
      </div>
    );
  }
}

export default App;
