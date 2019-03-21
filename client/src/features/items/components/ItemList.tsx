import React, { Fragment } from 'react';
import ItemListElement from './ItemListElement';
import Item from '../../../api/interfaces/item';
import MarkAsReadButton from './MarkAsReadButton';

type Props = {
  items: Item[];
};

const ItemList: React.StatelessComponent<Props> = props => {
  const items = props.items;
  const elements = items.map((val, i) => (
    <ItemListElement key={i.toString()} item={val} />
  ));

  return (
    <Fragment>
      <MarkAsReadButton />
      <ol>{elements}</ol>
      <MarkAsReadButton />
    </Fragment>
  );
};

export default ItemList;
