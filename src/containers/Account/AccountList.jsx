import React, { Component } from 'react';
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

import * as API from 'src/utils/API';


class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      otherError: '',
      accounts: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const accounts = await API.getAccounts();
      this.setState({ accounts });
    } catch (e) {
      this.setState({
        otherError: e
      });
    }

    this.setState({ isLoading: false });
  }

  renderAccountsList(accounts) {
    return accounts.map(
      (account) =>
        <LinkContainer
          key={account.accountId}
          to={`/accounts/${account.accountId}`}
          className="account-item"
          style={{
            backgroundColor: `#${account.color}`
          }}
        >
          <ListGroupItem header={account.accountName.trim()}>
            {'Currency: ' + account.currency}
          </ListGroupItem>
        </LinkContainer>
    );
  }

  renderDefault() {
    return (
      <h2>Account List</h2>
    );
  }

  renderAccounts() {
    return (
      <div className="accounts">
        <h1>Accounts</h1>
        {!!this.state.otherError && <Alert
          onClose variant="danger"
        >
          {this.state.otherError}
        </Alert>}
        <ListGroup className="account-list">
          {!this.state.isLoading && this.renderAccountsList(this.state.accounts)}
        </ListGroup>
        <LinkContainer
          key="new"
          to="/accounts/new"
          className="add-btn"
        >
          <ListGroupItem>
            <h4>
              <b>{'\uFF0B'}</b> Create a new account
            </h4>
          </ListGroupItem>
        </LinkContainer>
      </div>
    );
  }

  render() {
    return (
      <div className="AccountList">
        {this.props.isAuthenticated ? this.renderAccounts() : this.renderDefault()}
      </div>
    );
  }
}

AccountList.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default AccountList;
