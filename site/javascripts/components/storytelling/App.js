import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Action from './Action';
import Actions from './Actions';

// @todo use oauth, this is for demo purpose
window.cmaKey = 'ed799bbf8abe90519cd4a742d026ac79ae2bc2655c22427258f9574ccef36481'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCMAKey = this.setCMAKey.bind(this)
  }
  setCMAKey(ev) {
    window.cmaKey = ev.target.value; // @todo don't care about globals, it's a prototype
  }
  render() {
    return <div className="container">
      <p className="clearfix">
        <input className="pull-right" type="text" placeholder="Enter CMA key" value={window.cmaKey}
          onChange={this.setCMAKey} />
      </p>
      <Router history={hashHistory} >
        <Route path="/storytelling" component={Actions} />
        <Route path="/storytelling/action/:id" component={Action} />
      </Router>
    </div>
  }
}
