import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class price extends Component {

	editPriceHandler = (id) => {
		this.props.history.push("/edit-price/" + this.props.id);
	}

	render() {
		return (		
			<div className="Price">
				Product: {this.props.description}
				<br/>
				Price: {this.props.price}
				<br/>
				Start date: {this.props.startDate}
				<br/>
				End date: {this.props.endDate}
				<p><button onClick={this.props.applyDiscount}>Apply {this.props.maxDiscount * 100}% OFF</button></p>
				<p>
					<button onClick={() => this.editPriceHandler(this.props.id)}>Edit</button>
					<button onClick={this.props.delete}>Delete</button>
				</p>
			</div>
		  );
	}
	
}

export default withRouter(price);