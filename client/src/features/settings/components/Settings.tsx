import React, { useState, Fragment } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from '../../../styled-components';
import { Settings as SettingsIcon } from 'styled-icons/material/Settings';
import Modal from './Modal';
import { openLinksSettingsToggled } from '../actions';

const StyledButton = styled.button`
  font-size: 1.2em;
  background: none;
  border: none;
  cursor: pointer;
  width: 25px;
  height: 25px;

  &:focus {
    outline: none;
  }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  color: ${props => props.theme.colors.alfa};
`;

type Props = {
  isOpenLinksNewTab: boolean;
  openLinksSettingsToggled: () => void;
};

const Settings = ({ isOpenLinksNewTab, openLinksSettingsToggled }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <Fragment>
      <StyledButton type="button">
        <StyledSettingsIcon onClick={() => setIsModalOpen(true)} />
      </StyledButton>
      <Modal
        title="Ustawienia"
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <div>
          Linki w nowym oknie:{' '}
          <input
            type="checkbox"
            checked={isOpenLinksNewTab}
            onChange={() => openLinksSettingsToggled()}
          />
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/tradziej"
          >
            Feedback
          </a>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openLinksSettingsToggled: () => dispatch(openLinksSettingsToggled() as any),
  };
};

const mapStateToProps = ({ settingsReducer }: any) => {
  return {
    isOpenLinksNewTab: settingsReducer.openLinksNewTab,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
