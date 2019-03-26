import React, { Fragment } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { sessionTokenChanged } from '../actions';

interface Props extends RouteComponentProps<any> {}
interface Props {
  sessionTokenChanged: (token: string) => void;
  sessionToken: string;
}

type State = {
  redirect: any;
};

class SessionSync extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: '',
    };
  }

  componentDidMount() {
    const { match, sessionTokenChanged } = this.props;

    sessionTokenChanged(match.params.sessionToken);
    this.setState({
      redirect: <Redirect to={'/'} />,
    });
  }

  render() {
    return <Fragment>{this.state.redirect}</Fragment>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sessionTokenChanged: (token: string) =>
      dispatch(sessionTokenChanged(token) as any),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SessionSync);
