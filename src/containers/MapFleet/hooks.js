const setUpHooksForMe = (meThis) =>
  (hookId, inHook) => {
    meThis.hooks[hookId] = inHook;
  };

const execHooksForMe = (meThis) =>
  (hookId, id) => {
    if (meThis.hooks[hookId] !== undefined && meThis.hooks[hookId] !== null) {
      meThis.hooks[hookId](id);
    }
  };

export default {
  setUpHooksForMe,
  execHooksForMe,
};
