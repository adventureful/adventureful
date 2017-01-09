import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import Choices from './Choices';
import { getBook } from '../data/book';
import { getPage } from '../data/page';

var customAction;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(ev) {
    ev.preventDefault();
    if (!customAction) { return; }
    alert(`You tried to \'${customAction}\', but nothing happened. For a moment you think you heard an eerie distant voice whisper: 'FEATURE NOT IMPLEMENTED'. \nYou wonder what that might mean...`)
    return;
  }
  render() {
    const props = this.props;
    const state = this.state;
    if (!state || !state.page ||
      (props.routeParams.id && state.page.sys.id !== props.routeParams.id)) {
      if (props.routeParams.id) {
        getPage(props.routeParams.id)
          .then((page) => this.setState({page: page}))

      } else {
        getBook()
          .then((book) => getPage(book.fields.startingPage.sys.id))
          .then((page) => this.setState({page: page}))
      }
      return <div className="loading text-center">Loading...</div>;
    } else {
      return <form className="container" onSubmit={this.onSubmit}>
        <Page fields={state.page.fields} sys={state.page.sys}/>
        <Choices items={state.page.fields.nextPage}/>
        <input className="form-control" type="text" placeholder=">"
          onChange={(ev) => { customAction = ev.target.value }}  />
      </form>
    }
  }
}
