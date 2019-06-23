import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

import Routes from 'src/Routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }


  userHasAuthenticated(authenticated) {
    this.setState({ isAuthenticated: authenticated });
  }

  // eslint-disable-next-line no-unused-vars
  async handleLogout(event) {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <>
          <Navbar collapseOnSelect bg="light" expand="md">
            <Navbar.Brand>
              <Link to="/">Xpense</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="justify-content-end ml-auto">
                {this.state.isAuthenticated
                  ? <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
                  : <>
                      <LinkContainer as={Nav.Link} to="/signup">
                        <Nav.Item>Signup</Nav.Item>
                      </LinkContainer>
                      <LinkContainer as={Nav.Link} to="/login">
                        <Nav.Item>Login</Nav.Item>
                      </LinkContainer>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
