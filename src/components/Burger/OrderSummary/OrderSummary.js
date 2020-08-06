import React from 'react';
import EnclosingWrapper from '../../../hoc/EnclosingWrapper';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span> :{' '}
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <EnclosingWrapper>
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </EnclosingWrapper>
  );
};

export default orderSummary;
