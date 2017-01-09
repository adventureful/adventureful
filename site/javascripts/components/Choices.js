import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  const items = props.items.map((item) => <li key={item.sys.id}><a>{item.fields.title}</a></li>)
  return <ul className="choices">{items}</ul>
}
