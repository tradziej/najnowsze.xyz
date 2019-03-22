import React, { Fragment } from 'react';
import ItemListElement from './ItemListElement';
import Item from '../../../api/interfaces/item';
import styled from '../../../styled-components';

const StyledOl = styled.ol`
  list-style: inside decimal;
  margin-top: 25px;
`;

type Props = {
  items: Item[];
};

const ItemList: React.StatelessComponent<Props> = ({ items }) => {
  const elements = items.map((val, i) => (
    <ItemListElement key={i.toString()} item={val} />
  ));

  return <StyledOl>{elements}</StyledOl>;
};

export default ItemList;
