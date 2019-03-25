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
    background: ${props => props.theme.colors.golf};
  }

  body.light-mode {
    color: ${props => props.theme.colors.charlie};
  }

  body.dark-mode {
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

  textarea,
  input[type="search"],
  input[type="text"],
  input[type="button"],
  input[type="submit"] {
      -webkit-appearance: none;
      border-radius: 0;
  }
`;
