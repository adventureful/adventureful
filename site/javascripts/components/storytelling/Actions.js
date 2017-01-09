import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default function render(props) {
  if (!props.items || !props.items.length) {
    return null;
  }
  const items = props.items.map((item) =>
    <li className="list-group-item" key={item.id}>
      <Link to={{ pathname: '/storytelling/action/' + item.id }} >
        {`"${item.text}" @ "${item.page.fields.title}"`}
      </Link>
    </li>)
  return <ul className="list-group actions">{items}</ul>
}
