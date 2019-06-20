import React, { Component } from 'react';
import {
  Alert,
  HelpBlock,
  FormGroup,
  FormControl,
  FormLabel
} from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import LoaderButton from 'src/components/LoaderButton/LoaderButton';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      usedEmail: false,
      resentConfirmCode: false,
      otherError: '',
      newUser: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });

    } catch (e) {
      try {
        const resentResult = await Auth.resendSignUp(this.state.email);
        if (resentResult) {
          this.setState({
            resentConfirmCode: true
          });
        }

      } catch (e) {
        if (e.code === 'InvalidParameterException' && e.message === 'User is already confirmed.') {
          // The email has been used to register for another account
          this.setState({
            usedEmail: true
          });
        } else {
          this.setState({
            otherError: e.message
          });
        }
      }
    }

    this.setState({ isLoading: false });
  }

  async handleConfirmationSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <>
        {this.state.usedEmail && <Alert
          onClose variant="danger"
        >
          This email has already been used. Please enter another email address.
        </Alert>}
        {!!this.state.otherError && <Alert
          onClose variant="danger"
        >
          {this.state.otherError}
        </Alert>}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…"
          />
        </form>
      </>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser !== null || this.state.resentConfirmCode
          ? this.renderConfirmationForm()
          : this.renderForm()}
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object,
  userHasAuthenticated: PropTypes.func.isRequired
};

export default Signup;
