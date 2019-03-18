import React from 'react';
import styled from '../../../styled-components';
import Item from '../../../api/interfaces/item';
import DomainExtractor from '../../../utils/domain-extractor';

type Props = {
  item: Item;
};

const Domain = styled.span`
  color: ${props => props.theme.colors.alfa};
`;

const ItemLink: React.StatelessComponent<Props> = ({ item }) => {
  const extractor = new DomainExtractor(item.link);
  const title = item.title.replace(/&quot;/g, '"');

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={item.link}
      title={item.description}
    >
      {title} <Domain>({extractor.getDomain()})</Domain>
    </a>
  );
};

export default ItemLink;
