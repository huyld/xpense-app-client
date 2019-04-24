import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';


import AccountForm from '../../components/AccountForm/AccountForm';
import * as API from 'src/utils/API';

class Account extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRadiosChange = this.handleRadiosChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      accountId: null,
      accountName: '',
      currency: '',
      color: '',
      otherError: '',
      isDeleting: null,
      isLoading: null,
    };
  }

  async componentDidMount() {
    try {
      const account = await API.getAccount(this.props.match.params.id);
      const { accountId, accountName, initialBalance, currency, color } = account;

      this.setState({
        accountId,
        accountName,
        initialBalance,
        currency,
        color,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('Error while getting account', e);
      this.setState({ otherError: e });
    }
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
      await API.saveAccount({
        accountId: this.state.accountId,
        accountName: this.state.accountName,
        initialBalance: this.state.initialBalance,
        currency: this.state.currency,
        color: this.state.color,
      });
      this.props.history.push('/accounts');
    } catch (e) {
      this.setState({ otherError: e });
      this.setState({ isLoading: false });
    }
  }

  async handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note? Deleting account also deletes related transactions. This account cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await API.deleteAccount(this.props.match.params.id);
      this.props.history.push('/accounts');
    } catch (e) {
      this.setState({ otherError: e });
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      !!this.state.accountName &&
      <div className="Account">
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
          handleDelete={this.handleDelete}

          accountName={this.state.accountName}
          initialBalance={this.state.initialBalance}
          currency={this.state.currency}
          color={this.state.color}
          isLoading={this.state.isLoading}
          isDeleting={this.state.isDeleting}
          isNew={false}
        ></AccountForm>
      </div>
    );
  }
}

Account.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Account;
