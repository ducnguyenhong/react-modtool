import React, { Component } from 'react';
import Menu from './components/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RouterURLs from './components/RouterURL';
import './components/components.css';

export default class App extends Component {

  showRouterURL = (RouterURLs) => {
    let result = null;
      if (RouterURLs.length > 0) {
          result = RouterURLs.map((RouterURL, index) => {
              return (
                  <Route
                      key={index}
                      path={RouterURL.path}
                      exact={RouterURL.exact}
                      component={RouterURL.main}
                  />
              );
          });
      }
      return <Switch>{result}</Switch>;
  }

  render() {
    return (
      <Router>
          <div>
            <Menu/>
            {this.showRouterURL(RouterURLs)}
          </div>
      </Router>
    )
  }
}
