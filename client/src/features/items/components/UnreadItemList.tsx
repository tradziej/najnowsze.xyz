import React, { Fragment } from 'react';
import Item from '../../../api/interfaces/item';
import MarkAsReadButton from './MarkAsReadButton';
import ItemList from './ItemList';

type Props = {
  items: Item[];
};

const UnreadItemList: React.StatelessComponent<Props> = ({ items }) => {
  return (
    <Fragment>
      <MarkAsReadButton />
      <ItemList items={items} />
      <MarkAsReadButton />
    </Fragment>
  );
};

export default UnreadItemList;
