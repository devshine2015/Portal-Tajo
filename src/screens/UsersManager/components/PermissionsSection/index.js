import React from 'react';
import SectionHeader from '../SectionHeader';
import MainActionButton from '../MainActionButton';
import PermissionForm from '../PermissionForm';
import PermissionsList from '../PermissionsList';

class PermissionsSection extends React.Component {
  state = {
    showForm: false,
    formMode: 'create',
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
          label="Permissions"
          action={(<MainActionButton
            label="Add permission"
            onClick={this.showForm}
          />)}
        />

        { this.state.showForm && <PermissionForm closeForm={this.closeForm} /> }

        <PermissionsList />
      </div>
    );
  }
}

export default PermissionsSection;
