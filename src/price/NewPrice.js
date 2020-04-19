import React, { Component } from 'react';

class newprice extends Component {

	state = {
	}

	returnHandler = () => {
		this.props.history.push("/");
	}
	
	render() {
		let title = <p>New Price</p>;
		let message = null;
		let price = 
			<form onSubmit={this.saveHandler}>
				<div className="NewPrice">
					Product Id:  <input defaultValue="" />
					<br/>
					Product description:  <input defaultValue="" />
					<br/>
					Price: <input defaultValue="" />
					<br/>
					Start date: <input defaultValue="" /> 
					<br/>
					End date: <input defaultValue="" /> 
					<br/>
					Max discount: <input defaultValue="" /> 
					<br/>
				</div>
			</form>

		let navbar = 
			<div>
				<button type="Success">Save</button>
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

export default newprice;