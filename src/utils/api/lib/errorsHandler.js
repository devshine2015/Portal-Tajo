import { errorsActions } from 'services/Global/actions';
import getLocalType from 'configs/errors';

function errorsHandler(error, dispatch) {
  const localType = getLocalType(error);
  const toReject = {
    localType,
  };

  if (error && error.response) {
    toReject.error = error.response;
  } else {
    toReject.error = error;
  }

  // make not internal error available everywhere;
  if (Object.hasOwnProperty.call(localType, 'internal') && !localType.internal) {
    // TODO -- think about how to distingush errors
    // which have to be shown to user
    // aginst others (like 403)
    dispatch(errorsActions.setError(toReject.localType));
  }

  return Promise.reject(toReject);
}

export default errorsHandler;
