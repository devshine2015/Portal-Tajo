import { connect } from 'react-redux';
import { errorsActions } from 'services/Global/actions';
import { getErrorType } from 'services/Global/reducer';
import {
  onSuccess,
  onFailure,
} from 'services/Session/authHelpers';
import LoginForm from './LoginForm';

const mapState = state => ({
  errorType: getErrorType(state),
});
const mapDispatch = dispatch => ({
  resetError: () => dispatch(errorsActions.resetError()),
  onLoginSuccess: profile => onSuccess(profile, dispatch),
  onLoginFailure: () => onFailure(dispatch),
});

export default connect(mapState, mapDispatch)(LoginForm);
