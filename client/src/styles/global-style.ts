import { createGlobalStyle } from '../styled-components';
import { fontFamily, fontBold } from './variables';
import media from './media';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
  }

  html {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font-size: 1.250em;

    ${media.tablet`
      font-size: 1.125em;
    `};
  }

  body {
    ${fontFamily};
  }

  strong {
    ${fontBold};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.blue};
    border-bottom: 1px dotted ${props => props.theme.colors.black};
  }

  a:visited {
    text-decoration: none;
    color: ${props => props.theme.colors.grey};
  }
`;
