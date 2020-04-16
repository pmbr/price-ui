import React, { Component } from 'react';
import './App.css';
import Product from './Model/Product'

class App extends Component {

  state = {
    products: [
      { description: "t-shirt", price: 1.01 },
      { description: "shorts", price: 2.99 },
      { description: "polo", price: 0 }
    ]
  }

  render() {
    return (
      <div className="App">
        Welcome to Price UI
        {this.state.products
          .filter(p => p.price > 0)
          .map(p => 
            {
              return <Product description={p.description} price={p.price} />   ;
            })
        }
         
         
      </div>
    );    
  }

}

export default App;
