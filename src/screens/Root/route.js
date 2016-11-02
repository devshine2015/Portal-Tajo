// import { ROOT_ROUTE } from 'configs';
import { setInnerPortalPages } from 'containers/InnerPortal/actions';
import createBaseUrl from 'utils/createBaseUrl';

const NAME = 'root';

function patchMenuPaths(menu = [], rootRoute = {}, fleet = undefined) {
  // check if defined menu items actually in routes;
  const rootChildrens = rootRoute.childRoutes.map(({ path }) => path);

  const filtered = menu
  .filter(({ path }) => rootChildrens.indexOf(path) !== -1)
  .map(item => ({
    ...item,
    path: `${createBaseUrl(fleet)}/${item.path}`,
  }));

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
