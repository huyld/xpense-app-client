import React, { Component } from 'react';
import {
  Alert,
  ControlLabel,
  FormGroup,
  FormControl,
  Radio } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as API from 'src/utils/API';
import LoaderButton from 'src/components/LoaderButton/LoaderButton';
import config from 'src/config';

class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadiosChange = this.handleRadiosChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isLoading: null,
      accountName: '',
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
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await API.postAccount({
        accountName: this.state.accountName,
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
          {this.state.otherError}
        </Alert>}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="accountName">
            <ControlLabel>Account name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.accountName}
            />
          </FormGroup>
          <FormGroup controlId="currency">
            <ControlLabel>Currency</ControlLabel>
            <FormControl componentClass="select"
              onChange={this.handleChange}
              value={this.state.currency}
            >
              {config.currencies.map(currency =>
                <option
                  key={currency.code}
                  value={currency.code}>{`${currency.code} - ${currency.name}`}
                </option>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="color">
            <ControlLabel>Color</ControlLabel>
            <div className="color-list">
              {config.accountColors.map(code =>
                <Radio
                  inline
                  type='radio'
                  key={code}
                  id={code}
                  name='color'
                  checked={this.state.color === code}
                  onChange={this.handleRadiosChange}
                >
                  <span style={{ backgroundColor: `#${code}` }}></span>
                </Radio>
              )}
            </div>
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}

NewAccount.propTypes = {
  history: PropTypes.object,
};

export default NewAccount;
