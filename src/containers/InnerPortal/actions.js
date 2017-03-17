import { replace } from 'react-router-redux';
import { loginActions } from 'services/Session/actions';
import { LOCAL_STORAGE_SESSION_KEY, BASE_URL } from 'configs';
import storage from 'utils/localStorage';

export const INNER_PORTAL_PAGES_SET = 'portal/InnerPortal/INNER_PORTAL_PAGES_SET';
export const INNER_PORTAL_SIDEBAR_CHANGE = 'portal/InnerPortal/INNER_PORTAL_SIDEBAR_CHANGE';

export const changeMainSidebarState = () => ({
  type: INNER_PORTAL_SIDEBAR_CHANGE,
});

export const setInnerPortalPages = pages => ({
  type: INNER_PORTAL_PAGES_SET,
  pages,
});

export const logout = () => dispatch =>
  dispatch(loginActions.logout())
  .then(({ sessionId }) => {
    const toDelete = [{
      id: sessionId,
    }];

    storage.cleanExactValues(LOCAL_STORAGE_SESSION_KEY, toDelete);
    dispatch(replace(`${BASE_URL}/login`));

    return Promise.resolve();
  });
