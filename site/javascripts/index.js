import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import StorytellingApp from './components/storytelling/App';
import StorytellingAction from './components/storytelling/Action';

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/storytelling" component={StorytellingApp} />
    <Route path="/storytelling/action/:id" component={StorytellingApp} />
    <Route path="/" component={App} />
    <Route path="/:id" component={App} />
  </Router>, document.getElementById('root'));
