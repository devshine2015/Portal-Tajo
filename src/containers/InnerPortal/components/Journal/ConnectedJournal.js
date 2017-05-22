import { connect } from 'react-redux';
import { getJournalSlice } from 'services/AlertsSystem/reducer';
import { getJournalEntries } from 'services/AlertsSystem/selectors';
import Journal from './Journal';

const makeMapStateToProps = () => {
  const getNotifications = getJournalEntries();

  const mapStateToProps = state => ({
    notifications: getNotifications(getJournalSlice(state)),
  });

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Journal);
