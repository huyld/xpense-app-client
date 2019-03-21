import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';

import Routes from 'src/Routes';

class App extends Component {
  render() {
    return (
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
            </Navbar>
            <Routes />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
