import React from 'react';
// import logo from './logo.svg';
// import { Router, Route, Redirect, browserHistory } from 'react-router';
import Search from './search'
import './App.css';

function App() {
  return (
    // <Router history={browserHistory}>
    //   <Redirect from='/' to='/welcom'>
    //   </Redirect>
    //   <Route path="/welcom" key={'Search'} component={Search}>
    //   </Route>
    // </Router>
    <Search />
  );
}

export default App;
