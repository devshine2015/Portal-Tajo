import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Drawer from 'material-ui/Drawer';
import MainMenu from 'components/MainMenu';
import { getDashboardPages, getSidebarState } from 'containers/Dashboard/reducer';
import { sidebarActions } from 'containers/Dashboard/actions';

import styles from './styles.css';

class MainSidebar extends React.Component {
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        containerClassName={styles.drawer}
        zDepth={1}
        onRequestChange={this.props.toggleSidebar}
      >
        <MainMenu
          baseUrl={this.props.baseUrl}
          pages={this.props.pages}
          closeSidebar={this.props.toggleSidebar}
        />
      </Drawer>
    );
  }
}

MainSidebar.propTypes = {
  baseUrl: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  pages: getDashboardPages(state).toArray(),
  open: getSidebarState(state),
});
const mapDispatch = {
  toggleSidebar: sidebarActions.sidebarStateChange,
};

const PureMainSidebar = pure(MainSidebar);

export default connect(mapState, mapDispatch)(PureMainSidebar);
