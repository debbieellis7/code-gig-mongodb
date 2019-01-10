import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Redux
// import { Provider } from 'react-redux';
// import store from './store';

import Home from './components/pages/Home';
import Gigs from './components/pages/Gigs';
import Add from './components/pages/Add';


class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/gigs" component={Gigs} />
          <Route exact path="/gigs/add" component={Add} />
        </React.Fragment>
      </Router>
      // </Provider>
    );
  }
}

export default App;
