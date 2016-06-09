import { fromJS } from 'immutable';

const initialState = fromJS({});

export default function reportsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
