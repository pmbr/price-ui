import React from 'react';

const price = (props) => {
  return (
    <div className="Price">
		<br/>
		Product: {props.description}
		<br/>
		Price: {props.price}
		<br/>
		Start date: {props.startDate}
		<br/>
		End date: {props.endDate}
		<br/>
		<button onClick={props.applyDiscount}>Apply {props.maxDiscount * 100}% OFF</button>
		<br/>
		<a href="/edit-price/1">Edit</a>
		<br/>
		<button onClick={props.delete}>Delete</button>
    </div>
  );
}

export default price;