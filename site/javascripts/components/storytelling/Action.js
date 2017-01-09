import React from 'react';
import ReactDOM from 'react-dom';
import { getPage } from '../../data/page';
import { getAction } from '../../data/actions';
import { makePage, makeLink, addLinkToPage } from '../../data/management';

export default class Action extends React.Component {
  constructor(props) {
    super(props);
    this.newLinkDto = {};
    this.newPageDto = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.setBody = this.setBody.bind(this);
  }
  setBody(ev) {
    this.newPageDto.body = ev.target.value
  }
  onSubmit(ev) {
    ev.preventDefault();
    const cmaKey = window.cmaKey;
    const state = this.state;
    makePage(cmaKey, this.newPageDto)
      .then((page) => {
        this.newLinkDto.pageId = page.sys.id;
        return makeLink(cmaKey, this.newLinkDto);
      })
      .then((link) => {
        return addLinkToPage(cmaKey, state.action.page.sys.id, link.sys.id)
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
      this.newPageDto.title = state.action.text
      this.newLinkDto.name = state.action.text
      return <form className=" action" onSubmit={this.onSubmit}>
        <h2>{state.page.fields.title}</h2>
        <p>{state.page.fields.body}</p>
        <p>> {state.action.text}</p>
        <textarea className="form-control" onBlur={this.setBody} />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    }
  }
}
