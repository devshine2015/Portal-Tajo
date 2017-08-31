import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { VelocityTransitionGroup } from 'velocity-react';
import MainActionButton from 'components/Controls/MainActionButton';
import Layout from 'components/Layout';
import AlertCard from './AlertCard';

import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { getAlertConditions } from 'services/AlertsSystem/reducer';
// import * as alertKinds from 'services/AlertsSystem/alertKinds';

import classes from './classes';

class AlertsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      formMode: 'create',
    };
    this.kindData = alertKinds.getAlertByKind(this.props.myAlertKind);

    // // this.FormComponent = () => React.cloneElement(props.formComponent, {
    // //   closeForm: this.closeForm,
    // // });
    // this.ListComponent = () => React.cloneElement(props.listComponent, {
    //   showForm: this.showForm,
    // });
  }

  showForm = () => {
    this.setState({
      showForm: true,
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false,
    });
  }

  render() {
    const enterAnimation = {
      animation: 'slideDown',
      duration: 250,
      style: { height: '' },
    };
    const leaveAnimation = {
      animation: 'slideUp',
      duration: 250,
    };

    const alertsList = this.props.alerts.filter(alrt => alrt.kind === this.props.myAlertKind)
          .map(alrt => <AlertCard key={alrt.id} alert={alrt} renderForm={this.props.renderForm} />);

    return (
      <Layout.Section>
        <Layout.Content maxWidth={700}>
          <Layout.Header
            icon={this.kindData.icon}
            label={this.props.headerLabel}
            style={{ paddingLeft: 0 }}
            action={!this.state.showForm && (
              <MainActionButton
                label={this.props.actionButtonLabel}
                onClick={this.showForm}
              />
            )}
          />

          <VelocityTransitionGroup
            component="div"
            enter={enterAnimation}
            leave={leaveAnimation}
            style={{ zIndex: 1000 }}
          >
            { this.state.showForm && (
              <div className={css(classes.formWrapper)}>
                  { this.props.renderForm({
                    isOpened: this.state.showForm,
                    closeForm: this.closeForm,
                    alert: { kind: this.props.myAlertKind },
                  })}
              </div>
            )}
          </VelocityTransitionGroup>
          {alertsList}
        </Layout.Content>
      </Layout.Section>
    );
  }
}

AlertsSection.propTypes = {
  renderForm: PropTypes.func.isRequired,
  myAlertKind: PropTypes.string.isRequired,
  alerts: PropTypes.array.isRequired,
  headerLabel: PropTypes.string.isRequired,
  actionButtonLabel: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = {
  // showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(AlertsSection));
