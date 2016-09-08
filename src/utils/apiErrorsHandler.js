

function forbiddenError(response) {
  console.log(response);
}

function chooseHandler(response) {
  switch (response.status) {
    case 403:
      forbiddenError(response);
      break;
    default:
      break;
  }
}

export default function middlewareStore(store) {
  return function middlewareNext(next) {
    return function middlewareAction(action) {
      try {
        debugger;
        return next(action);
      } catch (error) {
        debugger;
        chooseHandler(error, store.getState);
        return error;
      }
    };
  };
}
