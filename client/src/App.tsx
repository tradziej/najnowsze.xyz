import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from './styled-components';
import { GlobalStyle, theme } from './styles';
import { fontRegular } from './styles/variables';

const Title = styled('h1')`
  ${fontRegular};
  color: ${props => props.theme.colors.orange};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Title>Najnowsze</Title>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
};

App.displayName = 'App';
export default hot(App);
