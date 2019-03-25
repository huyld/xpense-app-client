import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';
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
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <BrowserRouter>
          <>
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Xpense</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  {this.state.isAuthenticated
                    ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    : <>
                        <LinkContainer to="/signup">
                          <NavItem>Signup</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <NavItem>Login</NavItem>
                        </LinkContainer>
                      </>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes childProps={childProps} />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
