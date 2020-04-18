import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Prices from './price/Prices';
import EditPrice from './price/EditPrice';
import NewPrice from './price/NewPrice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <p>Price UI</p>
        </header>
        < BrowserRouter>
          <Switch>
              <Route path="/" exact component={Prices} /> 
              <Route path="/new-price" exact component={NewPrice} /> 
              <Route path="/edit-price/:id" exact component={EditPrice} /> 
          </Switch>
        </BrowserRouter>
      </div>
    );    
  }
}

export default App;
