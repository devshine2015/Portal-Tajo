import { connect } from 'react-redux';
import DealerPortal from './DealerPortal';

const makeMapStateToProps = () => {
  const mapState = (/* state */) => {
    return {
      projectIsReady: true,
    };
  };

  return mapState;
};

const actions = {
  fetchSpecificData: () => console.log('LOL Start fetch data here'),
};

export default connect(makeMapStateToProps, actions)(DealerPortal);
