import React from 'react';
import ReactDOM from 'react-dom';
import Action from './Action';
import Actions from './Actions';
import { getActions } from '../../data/actions';

var customAction;

export default class App extends React.Component {
  render() {
    const props = this.props;
    const state = this.state;

    if (!state || !state.actions) {
        getActions().then((actions) => this.setState({ actions }))
      return <div className="loading text-center">Loading...</div>;
    } else {
      return <div className="container">
        <div className="col-xs-6">
          <h2>Incoming actions</h2>
          <Actions items={state.actions}/>
        </div>
        <div className="col-xs-6">
          <h2>Available pages</h2>
        </div>
      </div>
    }
  }
}
