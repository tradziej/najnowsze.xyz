import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from '../../../styled-components';
import { setVisibilityFilter } from '../actions';

const FiltersList = styled.ul`
  margin-top: 25px;
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  list-style: none;

  li {
    padding-right: 15px;
    cursor: pointer;
  }

  li.selected {
    color: ${props => props.theme.colors.alfa};
  }
`;

type Props = {
  filter: string;
  setVisibilityFilter: (filter: string) => void;
};

class Filters extends React.Component<Props, {}> {
  render() {
    return (
      <FiltersList>
        {this.renderFilter('SHOW_IN_6H', '6h')}
        {this.renderFilter('SHOW_IN_12H', '12h')}
        {this.renderFilter('SHOW_IN_24H', '24h')}
      </FiltersList>
    );
  }

  renderFilter(filter: string, name: string) {
    const selected = filter === this.props.filter;
    if (selected) {
      filter = 'SHOW_ALL';
    }
    return (
      <li
        className={selected ? 'selected' : ''}
        onClick={e => {
          e.preventDefault();
          this.props.setVisibilityFilter(filter);
        }}
      >
        {name}
      </li>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    filter: state.itemsReducer.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setVisibilityFilter: (filter: string) =>
      dispatch(setVisibilityFilter(filter) as any),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
