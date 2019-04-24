import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as API from 'src/utils/API';
import AccountForm from 'src/components/AccountForm/AccountForm';

class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRadiosChange = this.handleRadiosChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isLoading: null,
      accountName: '',
      initialBalance: 0,
      currency: 'USD',
      color: 'ffaaaa',
      otherError: '',
    };
  }

  validateForm() {
    return this.state.accountName.length > 0;
  }

  handleRadiosChange(event) {
    this.setState({
      color: event.target.id
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]:
        event.target.id === 'initialBalance' ?
          event.target.valueAsNumber : event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await API.postAccount({
        accountName: this.state.accountName,
        initialBalance: this.state.initialBalance || 0,
        currency: this.state.currency,
        color: this.state.color,
      });
      this.props.history.push('/');
    } catch (e) {
      this.setState({ otherError: e });
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewAccount">
        {!!this.state.otherError && <Alert
          onDismiss bsStyle="danger"
        >
          {this.state.otherError.message}
        </Alert>}
        <AccountForm
          validateForm={this.validateForm}
          handleChange={this.handleChange}
          handleRadiosChange={this.handleRadiosChange}
          handleSubmit={this.handleSubmit}

          accountName={this.state.accountName}
          initialBalance={this.state.initialBalance}
          currency={this.state.currency}
          color={this.state.color}
          isLoading={this.state.isLoading}
          isNew={true}
        ></AccountForm>
      </div>
    );
  }
}

NewAccount.propTypes = {
  history: PropTypes.object,
};

export default NewAccount;
