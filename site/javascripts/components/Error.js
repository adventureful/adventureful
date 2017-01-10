import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  if (props.error.dontMessAround) {
    return <div className="container">
      <h1 className="text-danger">Hey you</h1>
      <p>Yes, you!</p>
      <p>I see what you did, stop messing around! &gt;:-[</p>
    </div>
  } else {
    return <div className="container">
      <h1 className="text-danger">Uh oh</h1>
      <p>This just happened:</p>
      <pre>{JSON.stringify(props.error)}</pre>
    </div>
  }
}
