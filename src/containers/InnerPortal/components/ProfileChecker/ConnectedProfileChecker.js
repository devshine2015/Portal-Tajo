import { connect } from 'react-redux';
import ProfileChecker from './ProfileChecker';

function makeMapToProps() {
  return function mapProps() {
    return {
      isDefaultPassword: true,
      userId: '12ad',
    };
  };
}

export default connect(makeMapToProps)(ProfileChecker);
