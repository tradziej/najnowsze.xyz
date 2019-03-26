import React from 'react';
import { Clock } from 'styled-icons/feather/Clock';
import styled from '../../../styled-components';
import Item from '../../../api/interfaces/item';
import ItemLink from './ItemLink';
import { fontItalic } from '../../../styles/variables';
import { ThemeProps } from '../../../styles/theme';
import media from '../../../styles/media';
import timeAgo from '../../../utils/time-ago';

type Props = {
  item: Item;
};

const StyledLi = styled.li`
  padding: 8px 5px;
`;

const CommentsLink = styled.a`
  color: ${({ theme }: ThemeProps) => theme.colors.foxtrot};
`;

const Details = styled.div`
  ${fontItalic};
  color: ${({ theme }: ThemeProps) => theme.colors.foxtrot};

  ${media.tablet`
    display: inline;
  `};
`;

const PromotedAgo = styled.span`
  padding-right: 5px;
`;

const StyledCockIcon = styled(Clock)`
  width: 16px;
  height: 16px;
`;

const ItemListElement: React.StatelessComponent<Props> = ({ item }) => {
  return (
    <StyledLi>
      <ItemLink item={item} />{' '}
      <Details>
        <PromotedAgo>
          <StyledCockIcon />
          {timeAgo(new Date(item.promoted_at))}
        </PromotedAgo>
        <CommentsLink
          target="_blank"
          rel="noopener noreferrer"
          href={item.guid}
        >
          komentarze
        </CommentsLink>
      </Details>
    </StyledLi>
  );
};

export default ItemListElement;
