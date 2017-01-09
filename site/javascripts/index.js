import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';
import Choices from './components/Choices';
import { getBook } from './data/book';
import { getPage } from './data/page';

getBook()
  .then((book) => getPage(book.fields.startingPage))
  .then((page) =>
    ReactDOM.render(
      <form className="container">
        <Page fields={page.fields} sys={page.sys}/>
        <Choices items={page.fields.nextPage}/>
        <input className="form-control" type="text" />
      </form>,
      document.getElementById('root')
    ));
