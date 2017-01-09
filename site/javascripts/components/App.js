import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import Choices from './Choices';

var customAction;
function onSubmit(ev) {
  ev.preventDefault();
  if (!customAction) { return; }
  alert(`You tried to \'${customAction}\', but nothing happened. For a moment you think you heard an eerie distant voice whisper: 'FEATURE NOT IMPLEMENTED'. \nYou wonder what that might mean...`)
  return
}

export default function render(props) {
  return <form className="container" onSubmit={onSubmit}>
    <Page fields={props.currentPage.fields} sys={props.currentPage.sys}/>
    <Choices items={props.currentPage.fields.nextPage} onSelect={props.onSelect}/>
    <input className="form-control" type="text" placeholder=">"
      onChange={(ev) => { customAction = ev.target.value }}  />
  </form>
}
