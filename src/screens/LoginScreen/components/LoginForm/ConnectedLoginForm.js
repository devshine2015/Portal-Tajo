import { connect } from 'react-redux';
import { errorsActions } from 'services/Global/actions';
import { getErrorType } from 'services/Global/reducer';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import {
  fetchAccessTokens,
  setSession,
} from 'services/Session/actions';
import LoginForm from './LoginForm';

const mapState = state => ({
  errorType: getErrorType(state),
});
const mapDispatch = dispatch => ({
  resetError: () => dispatch(errorsActions.resetError()),
  setReportsMWA: () => dispatch(setReportsMWA()),
  fetchAccessTokens: () => dispatch(fetchAccessTokens()),
  setSession: session => dispatch(setSession(session)),
});

export default connect(mapState, mapDispatch)(LoginForm);
