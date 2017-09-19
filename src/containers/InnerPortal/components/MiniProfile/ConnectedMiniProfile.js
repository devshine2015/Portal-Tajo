import { connect } from 'react-redux';
import { getProfileData } from 'services/Session/reducer';
import MiniProfile from './MiniProfile';

function makeMapState() {
  return function (state) {
    return getProfileData(state);
  };
}

export default connect(makeMapState)(MiniProfile);
