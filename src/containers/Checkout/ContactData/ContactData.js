import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from './../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      .then((response) => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch((error) => console.log(error))
      .finally(() => this.setState({ loading: true }));
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
