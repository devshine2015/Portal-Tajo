import { fleetActions } from './actions';


const NAME = ' root';

const createRoute = ({
  path,
  name = NAME,
  dispatch,
}) => ({
  path,
  name,
  component: require('./index').default,
  childRoutes: [],
  onEnter: (location) => {
    dispatch(fleetActions.setFleetName(location.params.fleet));
  },
});

module.exports = createRoute;
