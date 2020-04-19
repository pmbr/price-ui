import React, { Component } from 'react';
import priceService from './priceService';

import '../App.css';
import Price from './Price';

class prices extends Component {
  
  state = {
    prices: [],
    serviceError: false
  }

  componentDidMount() {
    priceService
      .get('/')
      .then(response => {
        this.setState({ prices: response.data, serviceError: false });
      }).catch(error => {
        this.setState({ serviceError: true });
      });
  }

  deletePriceHandler = (index) => {
    const prices = [...this.state.prices]
    prices.splice(index, 1);
    this.setState({ prices: prices }) 
  }

  applyDiscountHandler = (index) => {
    const prices = [...this.state.prices]
    const price = {
      ...this.state.prices[index]
    }
    price.price = price.price * (1 - price.maxDiscount)
    prices[index] = price;
    this.setState({ prices: prices }) 
  }

  newPriceHandler = () => {
    this.props.history.push("/new-price");
  }

  render() {
    let messages = null;
    let navbar = null;
    let prices = null;
    if (this.state.serviceError) {
      messages = <p>Price UI could not retrieve prices from price-service. Check if price-service is up and running.</p>
    } else {
      navbar =     
				<ul className="Nav">
					<li><button onClick={() => this.newPriceHandler()} >New Price</button></li>
					<li><button>Delete All</button></li>
        </ul>;
	
      prices = this.state.prices
          .filter(price => price.price > 0)
          .map((price, index) => 
            {
              return <Price 
                          key={price.id}
                          id={price.id}
                          productId={price.productId} 
                          productDescription={price.productDescription} 
                          price={price.price} 
                          startDate={price.startDate}
                          endDate={price.endDate}
                          maxDiscount={price.maxDiscount}
                          delete={() => this.deletePriceHandler(index)}
                          applyDiscount={() => this.applyDiscountHandler(index, price.maxDiscount)}
                        />
            });
    }
    return (
    	<div>
        {messages}
        {navbar}
        {prices}
      </div>
    );    
  }

}


export default prices;