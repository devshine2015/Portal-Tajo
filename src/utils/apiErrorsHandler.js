import { commonActions } from 'services/Auth/actions';

export default (dispatch, state) => error => {
  switch (error.response.status) {
    case 403: {
      dispatch(commonActions.eraseAuth());
      return Promise.resolve(error.response);
    }
    default:
      return Promise.resolve(error.response);
  }
};
