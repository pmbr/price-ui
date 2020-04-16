import React from 'react';

const product = (props) => {
  return (
    <div>
		<br/>
		Product: {props.description}
		<br/>
		Price: {props.price}
    </div>
  );
}

export default product;