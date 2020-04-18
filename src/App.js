import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import './App.css';
import Prices from './Prices';
import EditPrice from './EditPrice';

class App extends Component {

  render() {
  
    return (
      <div className="App">
        <header>
          <p>Price UI</p>
        </header>
        <BrowserRouter>
          <Route path="/" exact render={() => <Prices /> } /> 
          <Route path="/edit-price/" render={() => <EditPrice /> } /> 
          
        </BrowserRouter>
      </div>
    );    
  }

}

export default App;
