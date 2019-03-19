import React, { useState, Fragment } from 'react';
import styled from '../../../styled-components';
import { Settings as SettingsIcon } from 'styled-icons/material/Settings';
import Modal from './Modal';

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

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <Fragment>
      <StyledButton type="button">
        <StyledSettingsIcon onClick={() => setIsModalOpen(true)} />
      </StyledButton>
      <Modal
        title="Settings"
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
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

export default Settings;
