import React, { Fragment } from 'react';
import ItemListElement from './ItemListElement';
import { rgba } from 'polished';
import Item from '../../../api/interfaces/item';
import MarkAsReadButton from './MarkAsReadButton';
import styled from '../../../styled-components';

const ReadedElementsIndicator = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.bravo};
  background-color: ${props => props.theme.colors.delta};
  font-size: 1.125em;
  width: 100%;
  height: 3.545455em;
  padding-right: 15px;
  margin-bottom: 25px;
  text-align: center;
  line-height: 70px;
`;

const StyledOl = styled.ol`
  list-style: inside decimal;
`;

const FadedOutList = styled.div`
  position: absolute;

  &::before {
    content: '';
    pointer-events: none;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${props =>
      `linear-gradient(to bottom, ${rgba(props.theme.colors.golf, 0.2)} 0, ${
        props.theme.colors.golf
      } 99%)`};
  }
`;

type Props = {
  readItems: Item[];
  unreadItems: Item[];
};

const ItemList: React.StatelessComponent<Props> = props => {
  const { readItems, unreadItems } = props;
  const unreadElements = unreadItems.map((val, i) => (
    <ItemListElement key={i.toString()} item={val} />
  ));
  const readElements = readItems.map((val, i) => (
    <ItemListElement key={i.toString()} item={val} />
  ));

  return (
    <Fragment>
      <MarkAsReadButton />
      <StyledOl>{unreadElements}</StyledOl>
      <MarkAsReadButton />
      <ReadedElementsIndicator>Przeczytane</ReadedElementsIndicator>
      <FadedOutList>
        <StyledOl>{readElements.slice(0, 10)}</StyledOl>
      </FadedOutList>
    </Fragment>
  );
};

export default ItemList;
