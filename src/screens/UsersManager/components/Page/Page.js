import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import Layout from 'components/Layout';
import Submenu from '../Submenu';
import UsersSection from '../UsersSection';
import PermissionsSection from '../PermissionsSection';
import RolesSection from '../RolesSection';
import classes from './classes';

const SHOW_SUBMENU = false;

const SUBSECTIONS = [{
  label: 'Users',
  value: 'users',
  component: () => <UsersSection />,
}, {
  label: 'Roles',
  value: 'roles',
  component: () => <RolesSection />,
}, {
  label: 'Permissions',
  value: 'permissions',
  component: () => <PermissionsSection />,
}];

class UsersManagerPage extends React.Component {
  state = {
    activeSectionIndex: 0,
  }

  componentWillMount() {
    if (this.props.screenIsReady) {
      this.props.fetchRolesAndPerms();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.screenIsReady && nextProps.screenIsReady) {
      this.props.fetchRolesAndPerms();
    }
  }

  onSubsectionChange = (index) => {
    this.setState({
      activeSectionIndex: index,
    });
  }

  render() {
    const activeSubsection = SUBSECTIONS[this.state.activeSectionIndex];

    if (!this.props.screenIsReady) return null;

    return (
      <Layout.Content>
        <Layout.Row>

          { SHOW_SUBMENU && (
            <div className={css(classes.sidebar)}>
              <Submenu
                subsections={SUBSECTIONS}
                changeSection={this.onSubsectionChange}
                activeIndex={this.state.activeSectionIndex}
              />
            </div>
          )}

          <div className={css(classes.content)}>
            { activeSubsection.component() }
          </div>

        </Layout.Row>
      </Layout.Content>
    );
  }
}

UsersManagerPage.propTypes = {
  screenIsReady: PropTypes.bool.isRequired,
  fetchRolesAndPerms: PropTypes.func.isRequired,
};

export default UsersManagerPage;
