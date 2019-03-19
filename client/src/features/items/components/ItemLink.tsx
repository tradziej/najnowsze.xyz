import React from 'react';
import { connect } from 'react-redux';
import styled from '../../../styled-components';
import Item from '../../../api/interfaces/item';
import DomainExtractor from '../../../utils/domain-extractor';

const Domain = styled.span`
  color: ${props => props.theme.colors.alfa};
`;

type Props = {
  item: Item;
  isOpenLinksNewTab: boolean;
};

const ItemLink: React.StatelessComponent<Props> = ({
  item,
  isOpenLinksNewTab,
}) => {
  const extractor = new DomainExtractor(item.link);
  const title = item.title.replace(/&quot;/g, '"');
  const target = isOpenLinksNewTab ? '_blank' : '_self';

  return (
    <a
      target={target}
      rel="noopener noreferrer"
      href={item.link}
      title={item.description}
    >
      {title} <Domain>({extractor.getDomain()})</Domain>
    </a>
  );
};

const mapStateToProps = ({ settingsReducer }: any) => {
  return {
    isOpenLinksNewTab: settingsReducer.openLinksNewTab,
  };
};

export default connect(mapStateToProps)(ItemLink);
