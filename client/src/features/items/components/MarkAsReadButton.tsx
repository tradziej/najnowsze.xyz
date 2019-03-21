import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from '../../../styled-components';
import { markAsRead } from '../../settings/actions';

const StyledButton = styled.button`
  color: ${props => props.theme.colors.bravo};
  background-color: ${props => props.theme.colors.delta};
  outline-color: ${props => props.theme.colors.alfa};
  cursor: pointer;
  font-size: 1.125em;
  width: 100%;
  height: 3.545455em;
  padding-right: 15px;
  margin: 25px -25px 25px;
`;

type Props = {
  markAsRead: () => void;
};

const MarkAsReadButton = ({ markAsRead }: Props) => {
  return (
    <StyledButton type="button" onClick={() => markAsRead()}>
      Oznacz jako przeczytane
    </StyledButton>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    markAsRead: () => dispatch(markAsRead() as any),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MarkAsReadButton);
