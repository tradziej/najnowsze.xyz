import React from 'react';
import { Dispatch } from 'redux';
import styled from '../../../styled-components';
import Icon from './Icon';
import { connect } from 'react-redux';
import { searchTermChanged } from '../actions';

const StyledDiv = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  color: ${props => props.theme.colors.bravo};
  background-color: ${props => props.theme.colors.delta};
  font-size: 1.125em;
  width: 100%;
  height: 3.545455em;
  border: none;
  padding-left: 65px;
  padding-right: 15px;
  margin-left: -25px;
  margin-bottom: 25px;
`;

type Props = {
  searchTermChanged: (searchTerm: string) => void;
  innerRef?: (el: HTMLSpanElement) => void;
};

class SearchForm extends React.Component<Props, {}> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props, context: any) {
    super(props, context);
    this.inputRef = React.createRef();
  }

  componentDidMount(): void {
    window.addEventListener('keydown', e => this.handleKeydown(e));
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return (
      <StyledDiv>
        <Icon />
        <SearchInput
          type="search"
          ref={this.inputRef}
          onChange={e => this.props.searchTermChanged(e.target.value)}
        />
      </StyledDiv>
    );
  }

  handleKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
      e.preventDefault();

      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }

      window.setTimeout(function() {
        window.scrollTo(0, 0);
      }, 1);
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchTermChanged: (searchTerm: string) =>
      dispatch(searchTermChanged(searchTerm) as any),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchForm);
