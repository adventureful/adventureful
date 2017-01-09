import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default function render(props) {
  if (!props.items || !props.items.length) {
    return null;
  }
  const items = props.items.map((item) =>
    <li className="list-group-item" key={item.sys.id}>
      <Link to={{ pathname: '/' + item.fields.link.sys.id }} >{item.fields.name}</Link>
    </li>)
    return <div className="container page"><p>What do you do? <span className="typed-cursor">|</span></p><ul className="list-group choices">{items}</ul></div>
  }
