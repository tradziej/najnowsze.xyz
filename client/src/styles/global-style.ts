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
    font-size: 1.250em;

    ${media.tablet`
      font-size: 1.125em;
    `};
  }

  body {
    ${fontFamily};
  }

  body.light-mode {
    background: #ffffff;
    color: ${props => props.theme.colors.charlie};
    transition: background-color 0.3s ease;
  }

  body.dark-mode {
    background: ${props => props.theme.colors.charlie};
    color: ${props => props.theme.colors.foxtrot};

    .dark-mode-toggle > button {
      color: ${props => props.theme.colors.foxtrot};
      &:last-child {
        color: ${props => props.theme.colors.alfa};
      }
    }
  }

  strong {
    ${fontBold};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.bravo};
    border-bottom: 1px dotted ${props => props.theme.colors.charlie};
  }

  a:visited {
    text-decoration: none;
    color: ${props => props.theme.colors.foxtrot};
  }
`;
