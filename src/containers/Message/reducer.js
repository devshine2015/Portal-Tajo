import {
  MESSAGE_SHOW,
  MESSAGE_HIDE,
  MESSAGE_RESET,
} from './actions';

const initialState = {
  show: false,
  message: null,
  isError: false,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SHOW: {
      return Object.assign({}, state, {
        show: true,
        message: action.message,
        isError: action.isError,
      });
    }
    case MESSAGE_HIDE: {
      return Object.assign({}, state, {
        show: false,
      });
    }
    case MESSAGE_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
