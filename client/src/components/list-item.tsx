import React from 'react';
import styled from '../styled-components';
import Item from '../api/interfaces/item';

type Props = {
  item: Item;
};

const StyledLi = styled.li`
  padding: 5px;
`;

const ListItem: React.StatelessComponent<Props> = ({ item }) => {
  return <StyledLi>{item.title}</StyledLi>;
};

export default ListItem;
