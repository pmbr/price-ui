import React, { Component } from 'react';
import './App.css';
import Product from './Model/Product'

class App extends Component {

  state = {
    products: [
      { id: 1, description: "t-shirt", price: 1.01, maxDiscount: 0.5 },
      { id: 2, description: "shorts", price: 2.99, maxDiscount: 0.3 },
      { id: 3, description: "polo", price: 0, maxDiscount: 0}
    ]
  }

  deleteProductHandler = (index) => {
    const products = [...this.state.products]
    products.splice(index, 1);
    this.setState({ products: products }) 
  }

  applyDiscountHandler = (index) => {
    const products = [...this.state.products]
    const product = {
      ...this.state.products[index]
    }
    product.price = product.price * (1 - product.maxDiscount)
    products[index] = product;
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
              return <Product 
                          key={product.id}
                          description={product.description} 
                          price={product.price} 
                          maxDiscount={product.maxDiscount}
                          delete={() => this.deleteProductHandler(index)}
                          applyDiscount={() => this.applyDiscountHandler(index, product.maxDiscount)}
                        />
            })
        }
      </div>
    );    
  }

}

export default App;
