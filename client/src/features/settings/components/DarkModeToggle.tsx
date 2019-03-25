import React from 'react';
import { Dispatch } from 'redux';
import { WbSunny as Sun } from 'styled-icons/material/WbSunny';
import { Moon } from 'styled-icons/feather/Moon';
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
    color: ${props => props.theme.colors.alfa};
    cursor: pointer;
    transition: color 0.3s ease;
    &:last-child {
      color: ${props => props.theme.colors.foxtrot};
    }

    &:focus {
      outline: none;
    }
  }
`;

const StyledSun = styled(Sun)`
  width: 25px;
  height: 25px;
`;

const StyledMoon = styled(Moon)`
  width: 25px;
  height: 25px;
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
    document.body.classList.toggle('light-mode', !this.props.isDarkMode);
  }

  componentWillReceiveProps(nextProps: Props) {
    document.body.classList.toggle('dark-mode', nextProps.isDarkMode);
    document.body.classList.toggle('light-mode', !nextProps.isDarkMode);
  }

  render() {
    return (
      <DarkModeToggleContainer className="dark-mode-toggle">
        <button type="button" onClick={() => this.props.darkModeDisabled()}>
          <StyledSun />
        </button>
        <Toggle
          checked={this.props.isDarkMode}
          onChange={() => this.props.darkModeToggled()}
        />
        <button type="button" onClick={() => this.props.darkModeEnabled()}>
          <StyledMoon />
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
