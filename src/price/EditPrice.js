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
				<form onSubmit={this.saveHandler}>
					<div className="EditPrice">
						Product Id:  <input defaultValue={this.state.price.productId} />
						<br/>
						Product description:  <input defaultValue={this.state.price.productDescription} />
						<br/>
						Price: <input defaultValue={this.state.price.price} />
						<br/>
						Start date: <input defaultValue={this.state.price.startDate} /> 
						<br/>
						End date: <input defaultValue={this.state.price.endDate} /> 
						<br/>
						Max discount: <input defaultValue={this.state.price.maxDiscount} /> 
						<br/>
					</div>
				</form>
				savebutton = <button type="Success">Save</button>;
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