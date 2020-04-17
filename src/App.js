import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Product from './Model/Product';

class App extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/')
      .then(response => {
        this.setState({ products: response.data }) 
      });
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
