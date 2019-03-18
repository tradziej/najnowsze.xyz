import React from 'react';
import { Dispatch } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from './styled-components';
import { GlobalStyle, theme } from './styles';
import { fontRegular } from './styles/variables';
import ItemList from './features/items/components/ItemList';
import Item from './api/interfaces/item';
import { loadItems } from './features/items/actions';
import SearchForm from './features/search/components/SearchForm';
import DarkModeToggle from './features/settings/components/DarkModeToggle';

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

const NavBar = styled.div`
  top: 0;
  width: 100%;
  display: flex;
`;

type Props = {
  loadItems: () => void;
  items: Item[];
  loading: boolean;
  error: string;
  searchTerm: string;
};

class App extends React.Component<Props> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Contianer>
          <NavBar>
            <DarkModeToggle />
          </NavBar>
          <main>
            <Title>Najnowsze</Title>
            <SearchForm />
            {this.props.loading && <div>Wczytywanie...</div>}
            <ItemList items={this.getFilteredItems()} />
            <GlobalStyle />
          </main>
        </Contianer>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.props.loadItems();
  }

  getFilteredItems(): Item[] {
    const { searchTerm, items } = this.props;

    if (searchTerm === '') {
      return items;
    }

    const filteredItems = items.filter(item => {
      return (
        item.title.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
        item.link.toLocaleLowerCase().search(searchTerm.toLowerCase()) > -1
      );
    });

    return filteredItems;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadItems: () => dispatch(loadItems() as any),
  };
};

const mapStateToProps = ({ itemsReducer, searchReducer }: any) => {
  return {
    items: itemsReducer.items,
    loading: itemsReducer.loading,
    error: itemsReducer.error,
    searchTerm: searchReducer.searchTerm,
  };
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(module)(connectedApp);
