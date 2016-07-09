import { fleetActions } from 'containers/App/actions';
import { setInnerPortalPages } from 'containers/InnerPortal/actions';
import createBaseUrl from 'utils/createBaseUrl';

const NAME = 'root';

function patchMenuPaths(menu = [], rootRoute = {}, fleet) {
  // check if defined menu items actually in routes;
  const rootChildrens = rootRoute.childRoutes.map(({ path }) => path);

  const filtered = menu.filter(({ path }) => (
    rootChildrens.indexOf(path) !== -1
  ));

  const mapped = filtered.map(item => ({
    ...item,
    path: `${createBaseUrl(fleet)}/${item.path}`,
  }));

  return mapped;
}

const createRoute = ({
  path,
  name = NAME,
  dispatch,
  mainMenu,
}) => ({
  path,
  name,
  component: require('./index').default,
  indexRoute: {},
  childRoutes: [],
  onEnter: (location) => {
    const { params, routes } = location;
    const patchedMenu = patchMenuPaths(mainMenu, routes[0], params.fleet);

    dispatch(setInnerPortalPages(patchedMenu));
    dispatch(fleetActions.setFleetName(params.fleet));
  },
});

module.exports = createRoute;
