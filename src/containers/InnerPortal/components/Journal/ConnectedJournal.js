import { connect } from 'react-redux';
import { getJournalSlice } from 'services/AlertsSystem/reducer';
import makeGetNotifications from 'services/AlertsSystem/selectors';
import Journal from './Journal';

const makeMapStateToProps = () => {
  const getNotifications = makeGetNotifications();

  const mapStateToProps = state => ({
    notifications: getNotifications(getJournalSlice(state)),
  });

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Journal);
