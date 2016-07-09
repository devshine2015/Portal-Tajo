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
