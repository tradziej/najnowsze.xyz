import React from 'react';
import { Dispatch } from 'redux';
import styled from '../../../styled-components';
import { connect } from 'react-redux';

import Toggle from './Toggle';
import { darkModeToggled, darkModeEnabled, darkModeDisabled } from '../actions';

const DarkModeToggleContainer = styled.div`
  display: flex;
  margin: 0 auto;
  & > button {
    font-size: 1.2em;
    background: none;
    border: none;
    color: #ffe600;
    cursor: pointer;
    transition: color 0.3s ease;
    &:last-child {
      color: #666;
    }

    &:focus {
      outline: none;
    }
  }
`;

type Props = {
  isDarkMode: boolean;
  darkModeToggled: () => void;
  darkModeEnabled: () => void;
  darkModeDisabled: () => void;
};

class DarkModeToggle extends React.Component<Props, {}> {
  componentDidMount() {
    document.body.classList.toggle('dark-mode', this.props.isDarkMode);
    document.body.classList.toggle('light-mode', this.props.isDarkMode);
  }

  componentWillReceiveProps(nextProps: Props) {
    document.body.classList.toggle('dark-mode', nextProps.isDarkMode);
    document.body.classList.toggle('light-mode', nextProps.isDarkMode);
  }

  render() {
    return (
      <DarkModeToggleContainer>
        <button type="button" onClick={() => this.props.darkModeDisabled()}>
          ☀
        </button>
        <Toggle
          checked={this.props.isDarkMode}
          onChange={() => this.props.darkModeToggled()}
        />
        <button type="button" onClick={() => this.props.darkModeEnabled()}>
          ☾
        </button>
      </DarkModeToggleContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    darkModeToggled: () => dispatch(darkModeToggled() as any),
    darkModeEnabled: () => dispatch(darkModeEnabled() as any),
    darkModeDisabled: () => dispatch(darkModeDisabled() as any),
  };
};

const mapStateToProps = ({ settingsReducer }: any) => {
  return {
    isDarkMode: settingsReducer.darkMode,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DarkModeToggle);
