import React, { Component } from 'react';
import './App.css';
import Product from './Model/Product'

class App extends Component {

  state = {
    products: [
      { id: 1, description: "t-shirt", price: 1.01 },
      { id: 2, description: "shorts", price: 2.99 },
      { id: 3, description: "polo", price: 0 }
    ]
  }

  deleteProductHandler = (index) => {
    const products = [...this.state.products]
    products.splice(index, 1);
    this.setState({ products: products }) 
  }

  render() {
    return (
      <div className="App">
        Welcome to Price UI
        {this.state.products
          .filter(product => product.price > 0)
          .map((product, index) => 
            {
              return <div key={product.id}>
                      <Product 
                          description={product.description} 
                          price={product.price} 
                        />
                      <button>Edit</button>
                      <button onClick={() => this.deleteProductHandler(index)}>Delete</button>
                    </div>;
            })
        }
         
         
      </div>
    );    
  }

}

export default App;
