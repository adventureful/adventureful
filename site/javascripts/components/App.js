import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import Choices from './Choices';
import Error from './Error';
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
  load(pageId) {
    var p = null;
    if (pageId) {
      p = getPage(pageId)
    } else {
      p = getBook().then((book) => getPage(book.fields.startingPage.sys.id))
    }
    p.then((page) => {
      if (page.sys.contentType.sys.id !== 'page') {
        throw {dontMessAround: true}
      }
      this.setState({page: page})
    }).catch((err) => this.setState({error: err}))
  }
  render() {
    const props = this.props;
    const state = this.state || {};
    const pageId = props.routeParams.id;
    if (state.error) {
      return <Error error={state.error} />
    }
    if (!state.page || (pageId && state.page.sys.id !== pageId)) {
      this.load(pageId);
      return <div className="loading text-center">Loading...</div>;
    }
    return <form className="container" onSubmit={this.onSubmit}>
      <Page fields={state.page.fields} sys={state.page.sys}/>
      <Choices items={state.page.fields.nextPage}/>
      <input className="form-control" type="text" placeholder=">"
        onChange={(ev) => { customAction = ev.target.value }}  />
    </form>
  }
}
