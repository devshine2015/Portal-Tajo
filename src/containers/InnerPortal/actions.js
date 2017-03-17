export const INNER_PORTAL_PAGES_SET = 'portal/InnerPortal/INNER_PORTAL_PAGES_SET';
export const INNER_PORTAL_SIDEBAR_CHANGE = 'portal/InnerPortal/INNER_PORTAL_SIDEBAR_CHANGE';

export const changeMainSidebarState = () => ({
  type: INNER_PORTAL_SIDEBAR_CHANGE,
});

export const setInnerPortalPages = pages => ({
  type: INNER_PORTAL_PAGES_SET,
  pages,
});
