import { commonActions } from 'services/Auth/actions';

class APIErrors {
  constructor() {
    this.dispatch = () => ({});
    this.state = {};
  }

  injectStore(store) {
    this.dispatch = store.dispatch;
    this.state = store.getState();
  }

  handler = error => {
    switch (error && error.response && error.response.status) {
      case 403: {
        this.dispatch(commonActions.eraseAuth());
        break;
      }
      default: break;
    }

    return Promise.reject(error && error.response);
  }
}

const handler = new APIErrors();

export default handler;
