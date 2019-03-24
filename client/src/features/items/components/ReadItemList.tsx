import React, { Fragment } from 'react';
import { rgba } from 'polished';
import Item from '../../../api/interfaces/item';
import styled from '../../../styled-components';
import ItemList from './ItemList';

const ReadedElementsIndicator = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.bravo};
  background-color: ${props => props.theme.colors.delta};
  font-size: 1.125em;
  width: 100%;
  height: 3.125em;
  margin-top: 25px;
  text-align: center;
  line-height: 70px;
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
  items: Item[];
};

const ReadItemList: React.StatelessComponent<Props> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <ReadedElementsIndicator>Przeczytane</ReadedElementsIndicator>
      <FadedOutList>
        <ItemList items={items.slice(0, 10)} />
      </FadedOutList>
    </Fragment>
  );
};

export default ReadItemList;
