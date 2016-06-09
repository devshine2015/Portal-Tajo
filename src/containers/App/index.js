import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  checkUserAuthentication,
  setFleet,
} from './actions';
import createBaseUrl from 'utils/createBaseUrl';

class App extends React.Component {

  componentWillMount() {
    this.props.setFleet(this.props.fleet);
  }

  componentDidMount() {
    this.props.checkUserAuthentication(this.props.urls);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  urls: React.PropTypes.shape({
    success: React.PropTypes.string.isRequired,
    failure: React.PropTypes.string.isRequired,
  }).isRequired,
  setFleet: React.PropTypes.func.isRequired,
};

const mapState = (state, ownProps) => {
  const base = createBaseUrl(ownProps.params.fleet);

  return {
    fleet: ownProps.params.fleet,
    urls: {
      success: `${base}/dashboard`,
      failure: `${base}/login`,
    },
  };
};
const mapDispatch = {
  checkUserAuthentication,
  setFleet,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
