import { fromJS } from 'immutable';

const initialState = fromJS({});

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
