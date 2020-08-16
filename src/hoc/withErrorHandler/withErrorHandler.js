import React, { Component } from 'react';
import Modal from './../../components/UI/Modal/Modal';
import EnclosingWrapper from './../EnclosingWrapper/EnclosingWrapper';

const withErrorHandler = (WrappedComponnent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <EnclosingWrapper>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponnent {...this.props} />
        </EnclosingWrapper>
      );
    }
  };
};

export default withErrorHandler;
