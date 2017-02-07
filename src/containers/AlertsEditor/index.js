import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import AlertsList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import FixedContent from 'components/FixedContent';
import { showSnackbar } from 'containers/Snackbar/actions';
import { getAlertConditions } from 'services/AlertsSystem/reducer';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
          content={
            <AlertsList
              data={this.props.alerts}
            />
          }
        />
        <FloatingActionButton className={styles.addBtn}>
          <ContentAdd />
        </FloatingActionButton>
        {this.renderDetails()}
    </div>
    );
  }
}

AlertsEditor.propTypes = {
  // isLoading: React.PropTypes.bool.isRequired,
  // showSnackbar: React.PropTypes.func.isRequired,
  alerts: React.PropTypes.array.isRequired,
  // updateDetails: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
  // isLoading: getLoaderState(state),
});
const mapDispatch = {
  // showSnackbar,
};

const PureAlertsEditor = pure(AlertsEditor);

export default connect(mapState, mapDispatch)(PureAlertsEditor);
