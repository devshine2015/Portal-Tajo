import { connect } from 'react-redux';
import { errorsActions } from 'services/Global/actions';
import { getErrorType } from 'services/Global/reducer';
import LoginForm from './LoginForm';

const mapState = state => ({
  errorType: getErrorType(state),
});
const mapDispatch = dispatch => ({
  resetError: () => dispatch(errorsActions.resetError()),
});

export default connect(mapState, mapDispatch)(LoginForm);
