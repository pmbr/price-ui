import React from 'react';

const product = (props) => {
  return (
    <div>
		<br/>
		Product: {props.description}
		<br/>
		Price: {props.price}
		<br/>
		<button onClick={props.applyDiscount}>Apply {props.maxDiscount * 100}% OFF</button>
		<br/>
		<button>Edit</button>
		<br/>
		<button onClick={props.delete}>Delete</button>
    </div>
  );
}

export default product;