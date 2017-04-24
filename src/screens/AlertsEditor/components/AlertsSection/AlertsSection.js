import React from 'react';
import { css } from 'aphrodite/no-important';
import { VelocityTransitionGroup } from 'velocity-react';
import SectionHeader from '../SectionHeader';
import MainActionButton from '../MainActionButton';

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
        {this.props.children}
      </div>
    );
  }
}

Section.propTypes = {
  renderForm: React.PropTypes.func.isRequired,
  children: React.PropTypes.any.isRequired,
  headerLabel: React.PropTypes.string.isRequired,
  actionButtonLabel: React.PropTypes.string.isRequired,
};

export default Section;
