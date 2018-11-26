import './App.css';

import React, { Component } from 'react';

import Header from './components/header';
import Reciept from './contrainers/reciept';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="IT Glue reciept challenge"/>
        <Reciept/>
      </div>
    );
  }
}

export default App;
