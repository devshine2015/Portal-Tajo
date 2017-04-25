import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { VelocityTransitionGroup } from 'velocity-react';
import SectionHeader from '../SectionHeader';
import MainActionButton from '../MainActionButton';
import AlertCard from './AlertCard';

import { getAlertConditions } from 'services/AlertsSystem/reducer';
// import * as alertKinds from 'services/AlertsSystem/alertKinds';

import classes from './classes';

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      formMode: 'create',
    };
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
      duration: 400,
      style: { height: '' },
    };
    const leaveAnimation = {
      animation: 'slideUp',
      duration: 400,
    };

    const alertsList = this.props.alerts.filter(alrt => alrt.kind === this.props.myAlertKind)
          .map(alrt => <AlertCard key={alrt.id} alert={alrt} renderForm={this.props.renderForm} />);

    return (
      <div className={css(classes.sectionContainer)}>
        <SectionHeader
          label={this.props.headerLabel}
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
        >
          { this.state.showForm && (
            <div className={css(classes.formWrapper)}>
              <div className={css(classes.formWrapper__inn)}>
                { this.props.renderForm({
                  isOpened: this.state.showForm,
                  closeForm: this.closeForm,
                })}
              </div>
            </div>
          )}
        </VelocityTransitionGroup>
        {alertsList}
      </div>
    );
  }
}

Section.propTypes = {
  renderForm: React.PropTypes.func.isRequired,
  myAlertKind: React.PropTypes.string.isRequired,
  alerts: React.PropTypes.array.isRequired,
  headerLabel: React.PropTypes.string.isRequired,
  actionButtonLabel: React.PropTypes.string.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = {
  // showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(Section));
