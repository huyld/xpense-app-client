import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Radio,
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
      accountName, currency, color, isLoading, isDeleting, isNew } = this.props;
    return (
      <form onSubmit={handleSubmit} className="account-form">
        <FormGroup controlId="accountName">
          <ControlLabel>Account name</ControlLabel>
          <FormControl
            onChange={handleChange}
            value={accountName}
          />
        </FormGroup>
        <FormGroup controlId="currency">
          <ControlLabel>Currency</ControlLabel>
          <FormControl componentClass="select"
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
          <ControlLabel>Color</ControlLabel>
          <div className="color-list">
            {config.accountColors.map(code =>
              <Radio
                inline
                type='radio'
                key={code}
                id={code}
                name='color'
                checked={color === code}
                onChange={handleRadiosChange}
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
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text={isNew ? 'Create' : 'Update'}
          loadingText={isNew ? 'Creating…' : 'Updating…'}
        />
        {!isNew && <LoaderButton
          block
          bsStyle="danger"
          bsSize="large"
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
  currency: PropTypes.string,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isNew: PropTypes.bool,
};

export default AccountForm;
