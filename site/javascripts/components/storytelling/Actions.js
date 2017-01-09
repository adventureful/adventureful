import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { getActions } from '../../data/actions';

export default class Actions extends React.Component {
  render() {
    const props = this.props
    const state = this.state || {}
    if (!state || !state.actions) {
        getActions().then((actions) => this.setState({ actions }))
      return <div className="loading text-center">Loading...</div>;
    }
    const items = state.actions.map((item) =>
      <li className="list-group-item" key={item.id}>
        <Link to={{ pathname: '/storytelling/action/' + item.id }} >
          {`"${item.text}" @ "${item.page.fields.title}"`}
        </Link>
      </li>)
    return <div>
      <p>Here is what people want to do:</p>
      <ul className="list-group actions">{items}</ul>
    </div>
  }
}
