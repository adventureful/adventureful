import React from 'react';
import ReactDOM from 'react-dom';
import { getPage } from '../../data/page';
import { getAction } from '../../data/actions';
import { makePage, makeLink, addLinkToPage } from '../../data/management';

const newLinkDto = {
}

const newPageDto = {
};

export default class Action extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(ev) {
    ev.preventDefault();
    makePage(newPageDto)
      .then((page) => {
        newLinkDto.page = page.sys.id;
        return makeLink(newLinkDto);
      })
      .then((link) => {
        return addLinkToPage(state.action.page.sys.id, link)
      })
      .then(() => alert('Page created'))
  }
  render() {
    const state = this.state || {}
    const props = this.props
    if (!state.action) {
      getAction(props.routeParams.id)
        .then((action) => this.setState({ action }))
      return <div className="loading text-center">Loading...</div>;
    } else if (!state.page) {
      getPage(state.action.page.sys.id)
        .then((page) => this.setState({page}))
      return <div className="loading text-center">Loading...</div>;
    } else {
      newPageDto.title = state.action.title
      newLinkDto.name = state.action.title
      return <form className="container action" onSubmit={this.onSubmit}>
        <h2>{state.page.fields.title}</h2>
        <p>{state.page.fields.body}</p>
        <p>> {state.action.text}</p>
        <textarea className="form-control" onChange={(ev) => { newPageDto.body = ev.target.value }} />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    }
  }
}
