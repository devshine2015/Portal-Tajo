export const DASHBOARD_PAGES_SET = 'portal/Dashboard/DASHBOARD_PAGES_SET';

export const setDashboardPages = (childRoutes = []) => (dispatch) =>
  _setDashboardPages(childRoutes, dispatch);

function _setDashboardPages(childRoutes, dispatch) {
  const pages = childRoutes.map(route => ({
    text: route.niceName,
    path: route.path,
  }));

  dispatch({
    type: DASHBOARD_PAGES_SET,
    pages,
  });
}
