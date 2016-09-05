import { replace } from 'react-router-redux';
import { loginActions } from 'services/Auth/actions';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import {
  createBaseUrl,
  storage,
} from 'utils';

export const INNER_PORTAL_PAGES_SET = 'portal/InnerPortal/INNER_PORTAL_PAGES_SET';
export const INNER_PORTAL_SIDEBAR_CHANGE = 'portal/InnerPortal/INNER_PORTAL_SIDEBAR_CHANGE';

export const changeMainSidebarState = () => ({
  type: INNER_PORTAL_SIDEBAR_CHANGE,
});

export const setInnerPortalPages = (routes = []) => (dispatch) =>
  _setInnerPortalPages(routes, dispatch);

function _setInnerPortalPages(routes, dispatch) {
  const pages = routes.map(route => ({
    text: route.niceName,
    path: route.path,
    order: route.order,
  }));

  dispatch({
    type: INNER_PORTAL_PAGES_SET,
    pages,
  });
}

export const logout = () => dispatch =>
  dispatch(loginActions.logout())
    .then(({
      fleet,
      sessionId,
    }) => {
      const redirectTo = `${createBaseUrl(fleet)}/login`;
      const toDelete = [{
        id: sessionId,
      }];

      storage.cleanExactValues(LOCAL_STORAGE_SESSION_KEY, toDelete);
      dispatch(replace(redirectTo));

      return Promise.resolve();
    });
