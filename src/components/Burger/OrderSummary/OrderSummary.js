import React from 'react';
import EnclosingWrapper from '../../../hoc/EnclosingWrapper';

import Button from '../../UI/Button/Button'

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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </EnclosingWrapper>
  );
};

export default orderSummary;
