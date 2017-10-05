import { connect } from 'react-redux';
import makeGetProfileData from './selectors';
import ProfileChecker from './ProfileChecker';

function makeMapToProps() {
  const getProfileData = makeGetProfileData();

  return function mapProps(state) {
    return getProfileData(state);
  };
}

export default connect(makeMapToProps)(ProfileChecker);
