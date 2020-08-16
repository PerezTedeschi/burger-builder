import React, { Component } from 'react';
import EnclosingWrapper from '../../hoc/EnclosingWrapper/EnclosingWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    if (updatedIngredients[type] > 0) {
      updatedIngredients[type] = this.state.ingredients[type] - 1;
      const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice,
      });
    }
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: ' Santiago',
        address: {
          street: 'Test street',
          zipCode: '112233',
          country: 'Argentina',
        },
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ loading: true, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <EnclosingWrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchasable={!this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        ></BuildControls>
      </EnclosingWrapper>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
