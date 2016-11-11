// import { ROOT_ROUTE } from 'configs';
import { setInnerPortalPages } from 'containers/InnerPortal/actions';
import { BASE_URL } from 'configs';

const NAME = 'root';

function patchMenuPaths(menu = {}, rootRoute = {}) {
  // check if defined menu items actually in routes;
  const rootChildrens = rootRoute.childRoutes.map(({ path }) => path);

  const filtered = Object.values(menu)
    .filter(item => rootChildrens.indexOf(item.path) !== -1)
    .map(item => {
      const index = rootChildrens.indexOf(item.path);

      return {
        ...item,
        index,
        path: `${BASE_URL}/${item.path}`,
      };
    })
    .sort((a, b) => a.index - b.index);

  return filtered;
}

const createRoute = ({
  path,
  name = NAME,
  dispatch,
  mainMenu = [],
}) => ({
  path,
  name,
  component: require('./index').default,
  indexRoute: {},
  childRoutes: [],
  onEnter: (location) => {
    if (mainMenu.length === 0) return;

    const patchedMenu = patchMenuPaths(mainMenu, location.routes[0]);

    dispatch(setInnerPortalPages(patchedMenu));
  },
});

module.exports = createRoute;
