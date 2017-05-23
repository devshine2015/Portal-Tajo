import { connect } from 'react-redux';
import { logActions } from 'services/AlertsSystem/actions';
import {
  getLogsSlice,
  getConditionsSlice,
} from 'services/AlertsSystem/reducer';
import {
  makeGetLogEntries,
  makeGetIsConditionsReady,
} from 'services/AlertsSystem/selectors';
import Content from './Content';

const makeMapStateToProps = () => {
  const getLogs = makeGetLogEntries();
  const getIsConditionsReady = makeGetIsConditionsReady();

  const mapStateToProps = state => ({
    entries: getLogs(getLogsSlice(state)),
    isReady: getIsConditionsReady(getConditionsSlice(state)),
  });

  return mapStateToProps;
};

const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
};

export default connect(makeMapStateToProps, mapDispatch)(Content);
