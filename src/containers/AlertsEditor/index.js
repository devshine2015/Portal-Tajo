import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import AlertsList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';

class AlertsEditor extends React.Component {


  renderDetails() {
    return (
      <FixedContent containerClassName={styles.detailsContainer}>
        <div>
        </div>
      </FixedContent>
    );
  }

  render() {
    return (
      <div className={styles.editor}>

        <PowerList
          scrollable
        />
        {this.renderDetails()}
      </div>
    );
  }
}

// AlertsEditor.propTypes = {
//   isLoading: React.PropTypes.bool.isRequired,
//   showSnackbar: React.PropTypes.func.isRequired,
//   alerts: React.PropTypes.array.isRequired,
//   updateDetails: React.PropTypes.func.isRequired,
// };

// const mapState = (state) => ({
//   vehicles: fromFleetReducer.getVehiclesExSorted(state),
//   isLoading: getLoaderState(state),
//   globalSelectedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
// });
// const mapDispatch = {
//   showSnackbar,
// };

const PureAlertsEditor = pure(AlertsEditor);

// export default connect(mapState, mapDispatch)(PureAlertsEditor);
export default PureAlertsEditor;
