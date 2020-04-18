import React, { Component } from 'react';
import priceService from './priceService';

class prices extends Component {


  state = {
    price: {},
    serviceError: false
  }

	componentDidMount() {
	    priceService
	      .get('/' + 2)
	      .then(response => {
	        this.setState({ price: response.data, serviceError: false });
	      }).catch(error => {
	        this.setState({ serviceError: true });
	      });
	}

	render() {

	  return (
	    <div className="Price">
			<p>Edit Price</p>
			<br/>
			Product: {this.state.price.productDescription}
			<br/>
			Price: {this.state.price.price}
			<br/>
			Start date: {this.state.price.startDate}
			<br/>
			End date: {this.state.price.endDate}
			<br/>
			<button>Save</button>
			<br/>
			<a href="/">Return</a>
	    </div>
	  );
	}
}

export default prices;