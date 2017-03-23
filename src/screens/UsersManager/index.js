import React from 'react';
import { css } from 'aphrodite/no-important';
import Content from 'components/Content';
import Layout from 'components/Layout';
import Submenu from './components/Submenu';
import UsersSection from './components/UsersSection';
import PermissionsSection from './components/PermissionsSection';
import RolesSection from './components/RolesSection';

import classes from './classes';

const SHOW_SUBMENU = true;

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

class UsersManager extends React.Component {
  state = {
    activeSectionIndex: 0,
  }

  onSubsectionChange = index => {
    this.setState({
      activeSectionIndex: index,
    });
  }

  render() {
    const activeSubsection = SUBSECTIONS[this.state.activeSectionIndex];

    return (
      <Content>
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
      </Content>
    );
  }
}

export default UsersManager;
