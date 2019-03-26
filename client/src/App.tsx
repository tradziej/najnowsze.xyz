import React, { Fragment } from 'react';
import { Dispatch } from 'redux';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from './styled-components';
import media from './styles/media';
import { GlobalStyle, lightTheme, darkTheme } from './styles';
import { fontMedium } from './styles/variables';
import ItemList from './features/items/components/ItemList';
import UnreadItemList from './features/items/components/UnreadItemList';
import ReadItemList from './features/items/components/ReadItemList';
import Item from './api/interfaces/item';
import { loadItems, refreshItems } from './features/items/actions';
import SearchForm from './features/search/components/SearchForm';
import DarkModeToggle from './features/settings/components/DarkModeToggle';
import Settings from './features/settings/components/Settings';
import * as selectors from './features/items/selectors';

const Contianer = styled.div`
  height: 100%;
  margin: 0 10px 10px;
  padding-top: 20px;

  ${media.tablet`
    margin: 0 20px 20px;
  `};
`;

const Title = styled('h1')`
  ${fontMedium};
  color: ${props => props.theme.colors.alfa};
  margin: 0 auto 30px;
  text-align: center;
`;

const NavBar = styled.div`
  top: 0;
  width: 100%;
  display: flex;
`;

type Props = {
  loadItems: () => void;
  refreshItems: () => void;
  readItems: Item[];
  searchResultItems: Item[];
  unreadItemsCount: number;
  filteredUnreadItems: Item[];
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
    const {
      searchResultItems,
      filteredUnreadItems,
      readItems,
      searchTerm,
    } = this.props;

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
                {searchTerm !== '' ? (
                  <ItemList items={searchResultItems} />
                ) : (
                  <Fragment>
                    <UnreadItemList items={filteredUnreadItems} />
                    <ReadItemList items={readItems} />
                  </Fragment>
                )}
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

  componentWillUpdate(nextProps: Props) {
    const { unreadItemsCount } = nextProps;
    const title = 'Najnowsze wpisy z wykop.pl | najnowsze.xyz';
    document.title = title;
    if (unreadItemsCount > 0) {
      document.title = `(${unreadItemsCount}) ${title}`;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadItems: () => dispatch(loadItems() as any),
    refreshItems: () => dispatch(refreshItems() as any),
  };
};

const mapStateToProps = (state: any) => {
  return {
    readItems: selectors.readItemsList(state),
    searchResultItems: selectors.searchResultItemsList(state),
    unreadItemsCount: selectors.unreadItemsCount(state),
    filteredUnreadItems: selectors.filteredUnreadItems(state),
    loading: state.itemsReducer.loading,
    error: state.itemsReducer.error,
    searchTerm: state.searchReducer.searchTerm,
    isDarkTheme: state.settingsReducer.darkMode,
  };
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(connectedApp);
