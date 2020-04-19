import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class price extends Component {

	editPriceHandler = (id) => {
		this.props.onAnyValueChange(this.props.id)
		this.props.history.push("/edit-price/" + this.props.id);
	}

	render() {
		return (		
			<div className="Price">
				Product Id: {this.props.productId}
				<br/>
				Product Description: {this.props.productDescription}
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

const mapStateToProps = (state) => {
	return {
		value: state.anyValue
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAnyValueChange: (val) => dispatch({type: "CHANGE", newValue: val})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(price));