import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  return <div className="container page">
    <pre>{JSON.stringify(props.sys)}</pre>
    <h1>&gt; {props.fields.title}</h1>
    <p>{props.fields.body}</p>
    </div>
}
