import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import AlertsList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import FixedContent from 'components/FixedContent';
import { getAlertConditions, getAlertConditionByIdFunc } from 'services/AlertsSystem/reducer';
import { _NEW_ALERT_ID_, makeNewAlertConditionTemplate } from 'services/AlertsSystem/alertConditionHelper';

import AlertDetails from './components/AlertDetails';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styles from './styles.css';

class AlertsEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }

  onChooseAlert = id => {
    this.setState({ id });
  }

  onAddAlert = () => {
    this.setState({ id: _NEW_ALERT_ID_ });
  }

  onSaved = () => {
    this.setState({ id: 0 });
  }
  onCancelEdit = () => {
    this.setState({ id: 0 });
  }

  renderDetails() {
    const theAlert = this.state.id === _NEW_ALERT_ID_ ? makeNewAlertConditionTemplate()
      : this.props.alertById(this.state.id);
    return theAlert === null ? null :
    (
      <FixedContent containerClassName={styles.detailsContainer}>
        <AlertDetails
          details={theAlert}
          onSave={this.onSaved}
          onCancel={this.onCancelEdit}
        />
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
              onItemClick={this.onChooseAlert}
            />
          }
        />
        <FloatingActionButton className={styles.addBtn} onClick={this.onAddAlert} >
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
  alertById: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  // isLoading: getLoaderState(state),
});
const mapDispatch = {
  // showSnackbar,
};

const PureAlertsEditor = pure(AlertsEditor);

export default connect(mapState, mapDispatch)(PureAlertsEditor);
