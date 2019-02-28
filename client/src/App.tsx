import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from './styled-components';
import { GlobalStyle, theme } from './styles';
import { fontRegular } from './styles/variables';
import ItemsList from './components/items-list';
import Api from './api';
import Item from './api/interfaces/item';

type Props = {};

type State = {
  items: Item[];
  loading: boolean;
  error: string;
};

class App extends React.Component<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      items: [],
      loading: false,
      error: '',
    };
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Contianer>
          <main>
            <Title>Najnowsze</Title>
            <ItemsList items={this.state.items} />
            <GlobalStyle />
          </main>
        </Contianer>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.setState({ loading: true });
    const api = new Api();

    api
      .getItems()
      .then(res => {
        const items = res.data.items;
        this.setState({ items, loading: false });
      })
      .catch((err: Error) => {
        this.setState({ error: "Can't get items" });
      });
  }
}

const Contianer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 50px 50px;
  padding-top: 20px;
`;

const Title = styled('h1')`
  ${fontRegular};
  color: ${props => props.theme.colors.orange};
  margin: 0 auto 30px -20px;
`;

export default hot(App);
