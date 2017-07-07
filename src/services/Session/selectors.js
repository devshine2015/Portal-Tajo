import { createSelector } from 'reselect';
import { getMainAccessToken } from './reducer';

export default () =>
  createSelector(getMainAccessToken, token => token);
