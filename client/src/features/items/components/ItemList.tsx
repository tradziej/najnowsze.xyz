import React from 'react';
import ItemListElement from './ItemListElement';
import Item from '../../../api/interfaces/item';

type Props = {
  items: Item[];
};

const ItemList: React.StatelessComponent<Props> = props => {
  const items = props.items;
  const elements = items.map((val, i) => (
    <ItemListElement key={i.toString()} item={val} />
  ));

  return <ol>{elements}</ol>;
};

export default ItemList;
