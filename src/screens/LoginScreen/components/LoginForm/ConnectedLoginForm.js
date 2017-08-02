import { connect } from 'react-redux';
import { errorsActions } from 'services/Global/actions';
import { getErrorType } from 'services/Global/reducer';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import LoginForm from './LoginForm';

const mapState = state => ({
  errorType: getErrorType(state),
});
const mapDispatch = dispatch => ({
  resetError: () => dispatch(errorsActions.resetError()),
  setReportsMWA: () => dispatch(setReportsMWA()),
});

export default connect(mapState, mapDispatch)(LoginForm);
