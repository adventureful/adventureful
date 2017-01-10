import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  return <div className="container page">
    <h1>&gt; {props.fields.title}</h1>
    {props.fields.image ? <img style={{maxWidth: '100%'}} src={'https:' + props.fields.image.fields.file.url  + '?w=450'} /> : ''}
    <p>{props.fields.body}</p>
    </div>
}
