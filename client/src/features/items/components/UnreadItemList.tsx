import React, { Fragment } from 'react';
import Item from '../../../api/interfaces/item';
import MarkAsReadButton from './MarkAsReadButton';
import ItemList from './ItemList';
import Filters from './Filters';

type Props = {
  items: Item[];
};

const UnreadItemList: React.StatelessComponent<Props> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <MarkAsReadButton />
      <Filters />
      <ItemList items={items} />
      <MarkAsReadButton />
    </Fragment>
  );
};

export default UnreadItemList;
