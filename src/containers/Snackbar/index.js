import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Snackbar from 'material-ui/Snackbar';
import { getSnackbarState } from './reducer';

const SnackbarNotification = ({
  show,
  ...rest,
}) => (
  <Snackbar
    {...rest}
    open={show}
  />
);

SnackbarNotification.propTypes = {
  action: PropTypes.string,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string.isRequired,
  onActionTouchTap: PropTypes.func,
  onRequestClose: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

const mapProps = (state) => ({
  ...getSnackbarState(state).toJS(),
});
const mapDispatch = {};

const PureSnackbarNotification = pure(SnackbarNotification);

export default connect(mapProps, mapDispatch)(PureSnackbarNotification);
