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
  color: ${props => props.theme.colors.black};
  font-size: 1.125em;
  width: 100%;
  height: 3.545455em;
  background-color: #fff;
  border: none;
  padding-left: 65px;
  padding-right: 15px;
  margin-left: -25px;
  margin-bottom: 25px;
  outline: none;
`;

type Props = {
  searchTermChanged: (searchTerm: string) => void;
};

class SearchForm extends React.Component<Props, {}> {
  render() {
    return (
      <StyledDiv>
        <Icon />
        <SearchInput
          type="search"
          onChange={e => this.props.searchTermChanged(e.target.value)}
        />
      </StyledDiv>
    );
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
