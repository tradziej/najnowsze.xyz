import React from 'react';
import { Dispatch } from 'redux';
import { hot } from 'react-hot-loader';
import styled, { ThemeProvider } from './styled-components';
import { GlobalStyle, theme } from './styles';
import { fontRegular } from './styles/variables';
import ItemList from './features/items/components/ItemList';
import Item from './api/interfaces/item';
import { connect } from 'react-redux';
import { loadItems } from './features/items/actions';

const Contianer = styled.div`
  height: 100%;
  margin: 0 50px 50px;
  padding-top: 20px;
`;

const Title = styled('h1')`
  ${fontRegular};
  color: ${props => props.theme.colors.orange};
  margin: 0 auto 30px -25px;
`;

type Props = {
  loadItems: () => void;
  items: Item[];
  loading: boolean;
  error: string;
};

class App extends React.Component<Props> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Contianer>
          <main>
            <Title>Najnowsze</Title>
            {this.props.loading && <div>Wczytywanie...</div>}
            <ItemList items={this.props.items} />
            <GlobalStyle />
          </main>
        </Contianer>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.props.loadItems();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadItems: () => dispatch(loadItems() as any),
  };
};

const mapStateToProps = ({ itemsReducer }: any) => {
  return {
    items: itemsReducer.items,
    loading: itemsReducer.loading,
    error: itemsReducer.error,
  };
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(module)(connectedApp);
