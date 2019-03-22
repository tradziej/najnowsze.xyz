import React, { Fragment } from 'react';
import { Dispatch } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from './styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './styles';
import { fontRegular } from './styles/variables';
import ItemList from './features/items/components/ItemList';
import Item from './api/interfaces/item';
import { loadItems, refreshItems } from './features/items/actions';
import SearchForm from './features/search/components/SearchForm';
import DarkModeToggle from './features/settings/components/DarkModeToggle';
import Settings from './features/settings/components/Settings';

const Contianer = styled.div`
  height: 100%;
  margin: 0 50px 50px;
  padding-top: 20px;
`;

const Title = styled('h1')`
  ${fontRegular};
  color: ${props => props.theme.colors.alfa};
  margin: 0 auto 30px -25px;
`;

const NavBar = styled.div`
  top: 0;
  width: 100%;
  display: flex;
`;

type Props = {
  loadItems: () => void;
  refreshItems: () => void;
  items: Item[];
  loading: boolean;
  error: string;
  searchTerm: string;
  isDarkTheme: boolean;
};

class App extends React.Component<Props> {
  interval: number;

  constructor(props: Props, context: any) {
    super(props, context);
    this.interval = 0;
  }

  public render() {
    return (
      <ThemeProvider theme={this.props.isDarkTheme ? darkTheme : lightTheme}>
        <Contianer>
          <NavBar>
            <DarkModeToggle />
            <Settings />
          </NavBar>
          <main>
            <Title>Najnowsze</Title>
            {this.props.loading ? (
              <div>Wczytywanie...</div>
            ) : (
              <Fragment>
                <SearchForm />
                <ItemList items={this.getFilteredItems()} />
              </Fragment>
            )}
            <GlobalStyle />
          </main>
        </Contianer>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.props.loadItems();

    this.interval = setInterval(() => this.props.refreshItems(), 120000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    refreshItems: () => dispatch(refreshItems() as any),
  };
};

const mapStateToProps = ({
  itemsReducer,
  searchReducer,
  settingsReducer,
}: any) => {
  return {
    items: itemsReducer.items,
    loading: itemsReducer.loading,
    error: itemsReducer.error,
    searchTerm: searchReducer.searchTerm,
    isDarkTheme: settingsReducer.darkMode,
  };
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(module)(connectedApp);
