import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Snackbar from 'material-ui/Snackbar';
import { getSnackbarState } from './reducer';

class SnackbarNotification extends React.Component {
  render() {
    return (
      <Snackbar
        {...this.props}
        open={this.props.show}
      />
    );
  }
}

SnackbarNotification.propTypes = {
  action: React.PropTypes.string,
  autoHideDuration: React.PropTypes.number,
  message: React.PropTypes.string.isRequired,
  onActionTouchTap: React.PropTypes.func,
  onRequestClose: React.PropTypes.func,
  show: React.PropTypes.bool.isRequired,
};

const mapProps = (state) => ({
  ...getSnackbarState(state).toJS(),
});
const mapDispatch = {};

const PureSnackbarNotification = pure(SnackbarNotification);

export default connect(mapProps, mapDispatch)(PureSnackbarNotification);
