import React, { Component } from 'react';
import priceService from './priceService';

import './App.css';
import Product from './Model/Product';

class App extends Component {

  state = {
    products: [],
    serviceError: false
  }

  componentDidMount() {
    priceService
      .get('/')
      .then(response => {
        this.setState({ products: response.data, serviceError: false });
      }).catch(error => {
        this.setState({ serviceError: true });
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
    let content = null;
    if (this.state.serviceError) {
      content = <p>Price UI could not retrieve prices from price-service. Check if price-service is up and running.</p>
    } else {
      content = this.state.products
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
            });
    }
    return (
      <div className="App">
        Welcome to Price UI
        {content}
      </div>
    );    
  }

}

export default App;
