import { commonActions } from 'services/Auth/actions';
import { errorsActions } from 'services/Global/actions';
import getLocalType from 'configs/errors';

function errorsHandler(error, dispatch) {
  if (error && error.response && error.response.status) {
    // special codes
    switch (error.response.status) {
      case 403: {
        dispatch(commonActions.eraseAuth());
        break;
      }
      default: break;
    }
  }

  const localType = getLocalType(error);
  const toReject = {
    localType,
  };

  if (error && error.response) {
    toReject.error = error.response;
  } else {
    toReject.error = error;
  }

  // make error available everywhere;
  dispatch(errorsActions.setError(toReject.localType));

  return Promise.reject(toReject);
}

export default errorsHandler;
