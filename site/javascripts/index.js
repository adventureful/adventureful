import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';

getPage().then(function(data) {
  ReactDOM.render(
    <div className="container">
      <Page data={data}/>
    </div>,
    document.getElementById('root')
  );
})

function getPage() {
  return new Promise((resolve, reject) => resolve({ title: "hello" }));
}
