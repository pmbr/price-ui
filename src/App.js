import React, { Component } from 'react';
import './App.css';
import Product from './Model/Product'

class App extends Component {

  state = {
    products: [
      { description: "t-shirt", price: 1.01 },
      { description: "shorts", price: 2.99 }
    ]
  }

  render() {
    return (
      <div className="App">
         Welcome to Price UI
         <Product description={this.state.products[0].description} price={this.state.products[0].price} />
         <Product description={this.state.products[1].description} price={this.state.products[1].price} />
      </div>
    );    
  }
}

export default App;
