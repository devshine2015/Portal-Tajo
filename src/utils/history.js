import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { BASE_URL } from 'configs';

let history = null;

/*
* List of available paramse https://www.npmjs.com/package/history
* */
export function create() {
  history = useRouterHistory(createHistory)({
    basename: BASE_URL,
  });

  return getHistory();
}

export default function getHistory() {
  return history;
}
