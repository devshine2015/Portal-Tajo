import React from 'react';
import SectionHeader from '../SectionHeader';
import MainActionButton from '../MainActionButton';

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      formMode: 'create',
    };
    this.FormComponent = () => React.cloneElement(props.formComponent, {
      closeForm: this.closeForm,
    });
    this.ListComponent = () => React.cloneElement(props.listComponent, {
      showForm: this.showForm,
    });
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
    return (
      <div>
        <SectionHeader
          label={this.props.headerLabel}
          action={!this.state.showForm && (
            <MainActionButton
              label={this.props.actionButtonLabel}
              onClick={this.showForm}
            />
          )}
        />

        { this.state.showForm && <this.FormComponent /> }

        <this.ListComponent />
      </div>
    );
  }
}

Section.propTypes = {
  formComponent: React.PropTypes.any.isRequired,
  listComponent: React.PropTypes.any.isRequired,
  headerLabel: React.PropTypes.string.isRequired,
  actionButtonLabel: React.PropTypes.string.isRequired,
};

export default Section;
