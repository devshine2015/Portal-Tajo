import { socketActions } from 'services/FleetModel/actions';

const NAME = 'map';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  dispatch,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'map');
  },
  childRoutes: [],
  onLeave: () => {
    dispatch(socketActions.closeFleetSocket());
  },
  protected: true,
});

module.exports = createRoute;
