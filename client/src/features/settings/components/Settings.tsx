import React, { useState, useRef, Fragment } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Copy } from 'styled-icons/boxicons-solid/Copy';
import styled from '../../../styled-components';
import { Settings as SettingsIcon } from 'styled-icons/material/Settings';
import Modal from './Modal';
import { openLinksSettingsToggled, sessionTokenChanged } from '../actions';

const StyledButton = styled.button`
  font-size: 1.125em;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  color: ${props => props.theme.colors.alfa};
  width: 25px;
  height: 25px;
`;

const StyledCopyIcon = styled(Copy)`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  cursor: pointer;
`;

const SessionUrlInput = styled.input`
  width: 90%;
`;

const SessionResetButton = styled.button`
  cursor: pointer;
  color: ${props => props.theme.colors.alfa};
`;

type Props = {
  isOpenLinksNewTab: boolean;
  sessionToken: string;
  openLinksSettingsToggled: () => void;
  sessionTokenChanged: (token: string) => void;
};

const Settings = ({
  isOpenLinksNewTab,
  openLinksSettingsToggled,
  sessionToken,
  sessionTokenChanged,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState();
  const urlRef = useRef<HTMLInputElement | null>(null);

  const copyToClipboard = () => {
    const node = urlRef.current;

    if (node) {
      node.select();
      document.execCommand('copy');
    }
  };

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
          Link do synchronizacji sesji:
          <div>
            <SessionUrlInput
              ref={urlRef}
              type="text"
              readOnly
              value={`${process.env.APP_URL}/${sessionToken}`}
              onClick={() => copyToClipboard()}
            />
            <StyledCopyIcon onClick={() => copyToClipboard()} />
          </div>
        </div>
        <div>
          <SessionResetButton
            onClick={e => {
              e.preventDefault();
              sessionTokenChanged('');
              location.reload();
            }}
          >
            Nowa sesja
          </SessionResetButton>
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
    sessionTokenChanged: (token: string) =>
      dispatch(sessionTokenChanged(token) as any),
  };
};

const mapStateToProps = ({ settingsReducer }: any) => {
  return {
    isOpenLinksNewTab: settingsReducer.openLinksNewTab,
    sessionToken: settingsReducer.sessionToken,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
