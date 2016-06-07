const initialState = {
  name: "I'm another reducer",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
