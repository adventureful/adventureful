import React from 'react';
import ReactDOM from 'react-dom';

export default function render(props) {
  const items = props.items.map((item) =>
    <li className="list-group-item" key={item.sys.id}>
      <a onClick={props.onSelect.bind(null, item)}>{item.fields.title}</a>
    </li>)
  return <ul className="list-group choices">{items}</ul>
}
