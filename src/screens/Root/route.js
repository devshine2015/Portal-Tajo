import { setInnerPortalPages } from 'containers/InnerPortal/actions';

const NAME = 'root';

function patchMenuPaths(menu = {}, rootRoute = {}) {
  // check if defined menu items actually in routes;
  const rootChildrens = rootRoute.childRoutes.map(({ path }) => path);

  const filtered = Object.values(menu)
    .filter(item => rootChildrens.indexOf(item.path) !== -1)
    .map((item) => {
      const index = rootChildrens.indexOf(item.path);

      return {
        ...item,
        index,
        path: `/${item.path}`,
      };
    })
    .sort((a, b) => a.index - b.index);

  return filtered;
}

const createRoute = ({
  path,
  name = NAME,
  dispatch,
  menu = [],
  auth,
}) => ({
  path,
  name,
  auth,
  component: require('./index').default,
  indexRoute: {},
  childRoutes: [],
  onEnter: (location) => {
    if (menu.length === 0) return;

    const patchedMenu = patchMenuPaths(menu, location.routes[0]);

    dispatch(setInnerPortalPages(patchedMenu));
  },
});

export default createRoute;
