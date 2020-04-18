import React, { Component } from 'react';
import priceService from './priceService';

class editprice extends Component {

	state = {
		price: null,
		serviceError: false
	}

	returnHandler = () => {
		this.props.history.push("/");
	  }
	
	componentDidMount = (props) => {
		priceService
			.get('/' + this.props.match.params.id)
			.then(response => {
				this.setState({ price: response.data, serviceError: false });
			}).catch(error => {
				this.setState({ serviceError: true });
			});
	}

	render() {
		let title = <p>Edit Price</p>;
		let message = "Loading...";
		let price = null;
		let savebutton = null;

		if (this.state.serviceError) {
			message = <p>Price UI could not retrieve price from price-service. Check if price-service is up and running.</p>
		} else if (this.state.price) {
			message = null;
			price = 			
				<div className="EditPrice">
					Product: {this.state.price.productDescription}
					<br/>
					Price: {this.state.price.price}
					<br/>
					Start date: {this.state.price.startDate}
					<br/>
					End date: {this.state.price.endDate}					
					<br/>
				</div>
				savebutton = <button>Save</button>;
		}
		let navbar = 
			<div>
				{savebutton}
				<button onClick={() => this.returnHandler()}>Return</button>
			</div>
		return (
			<div>
				{title}
				{message}
				{price}
				{navbar}
			</div>
		);
	}

}

export default editprice;