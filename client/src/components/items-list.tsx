import React from 'react';
import ListItem from './list-item';
import Item from '../api/interfaces/item';

type Props = {
  items: Item[];
};

const ItemsList: React.StatelessComponent<Props> = props => {
  const items = props.items;
  const listItems = items.map((val, i) => (
    <ListItem key={i.toString()} item={val} />
  ));

  return <ol>{listItems}</ol>;
};

export default ItemsList;
