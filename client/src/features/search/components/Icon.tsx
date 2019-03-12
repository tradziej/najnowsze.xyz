import React from 'react';
import styled from '../../../styled-components';
import search from './search.svg';

const Image = styled.img`
  position: absolute;
  top: 22px;
  width: 32px;
  height: 32px;
`;

const Icon = () => <Image src={search} alt="" />;

export default Icon;
