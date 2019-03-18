import React from 'react';
import styled from '../../../styled-components';
import Item from '../../../api/interfaces/item';
import Link from './ItemLink';
import { fontItalic } from '../../../styles/variables';
import { ThemeProps } from '../../../styles/theme';

type Props = {
  item: Item;
};

const StyledLi = styled.li`
  padding: 8px 5px;
`;

const CommentsLink = styled.a`
  ${fontItalic};
  color: ${({ theme }: ThemeProps) => theme.colors.foxtrot};
`;

const ItemListElement: React.StatelessComponent<Props> = ({ item }) => {
  return (
    <StyledLi>
      <Link item={item} />{' '}
      <CommentsLink target="_blank" rel="noopener noreferrer" href={item.guid}>
        komentarze
      </CommentsLink>
    </StyledLi>
  );
};

export default ItemListElement;
