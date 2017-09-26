import { connect } from 'react-redux';
import { readyStateSelectors } from 'services/Users/selectors';
import { fetchRolesAndPermissions } from 'services/Users/actions';
import Page from './Page';

function makeProps() {
  return function mapProps(state) {
    return {
      screenIsReady: readyStateSelectors.getReadyState(state),
    };
  };
}

const actions = {
  fetchRolesAndPerms: fetchRolesAndPermissions,
};

export default connect(makeProps, actions)(Page);
