import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { getBook } from './data/book';
import { getPage } from './data/page';

function gotoPage(id) {
  getPage(id).then((page) =>
    ReactDOM.render(
      <App currentPage={page} onSelect={(item) => { gotoPage(item.sys.id) } }/>,
      document.getElementById('root')
    ));
}

getBook().then((book) => gotoPage(book.fields.startingPage.sys.id));
