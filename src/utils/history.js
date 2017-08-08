import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

let history = null;

/*
* List of available params https://www.npmjs.com/package/history
* */
export function create(base) {
  history = useRouterHistory(createHistory)({
    // see https://www.npmjs.com/package/history#using-a-base-url
    basename: base,
  });

  return getHistory();
}

export default function getHistory() {
  return history;
}
