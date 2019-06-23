import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
} from 'react-bootstrap';
import PropTypes from 'prop-types';


import LoaderButton from 'src/components/LoaderButton/LoaderButton';
import config from 'src/config';

class AccountForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { validateForm, handleChange, handleRadiosChange, handleSubmit, handleDelete,
      accountName, initialBalance, currency, color, isLoading, isDeleting, isNew } = this.props;
    return (
      <form onSubmit={handleSubmit} className="account-form">
        <FormGroup controlId="accountName">
          <FormLabel>Account name</FormLabel>
          <FormControl
            onChange={handleChange}
            value={accountName}
          />
        </FormGroup>
        <FormGroup controlId="initialBalance">
          <FormLabel>Initial balance</FormLabel>
          <FormControl
            onChange={handleChange}
            type="number"
            value={initialBalance}
            className="initial-balance"
          />
        </FormGroup>
        <FormGroup controlId="currency">
          <FormLabel>Currency</FormLabel>
          <FormControl as="select"
            onChange={handleChange}
            value={currency}
            disabled={isNew ? false : true}
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
          <FormLabel>Color</FormLabel>
          <div className="color-list">
            {config.accountColors.map(code =>
              <FormCheck
                inline
                type='radio'
                key={code}
                id={code}
                name='color'
                checked={color === code}
                onChange={handleRadiosChange}
              >
                <span style={{ backgroundColor: `#${code}` }}></span>
              </FormCheck>
            )}
          </div>
        </FormGroup>
        <LoaderButton
          block
          variant="primary"
          size="lg"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text={isNew ? 'Create' : 'Update'}
          loadingText={isNew ? 'Creating…' : 'Updating…'}
        />
        {!isNew && <LoaderButton
          block
          variant="danger"
          size="lg"
          isLoading={isDeleting}
          onClick={handleDelete}
          text="Delete"
          loadingText="Deleting…"
        />}
      </form>
    );
  }
}

AccountForm.propTypes = {
  validateForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRadiosChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: function(props, propName, componentName) {
    if ((props['isNew'] == false && (props[propName] == undefined || typeof(props[propName]) != 'function'))) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  accountName: PropTypes.string,
  initialBalance: PropTypes.number,
  currency: PropTypes.string,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isNew: PropTypes.bool,
};

export default AccountForm;
