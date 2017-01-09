import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  if (props.sys.contentType.sys.id !== 'page') {
    return <div className="container page">
      <h1>Hey you</h1>
      <p>Yes, you!</p>
      <p>I see what you did, stop messing around! &gt;:-[</p>
    </div>
  }
  return <div className="container page">
    <h1>&gt; {props.fields.name}</h1>
    {props.fields.image ? <img style={{maxWidth: '100%'}} src={'https:' + props.fields.image.fields.file.url}/> : ''}
    <p>{props.fields.body}</p>
    </div>
}
