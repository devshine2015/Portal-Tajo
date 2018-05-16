import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import classnames from 'classnames';
import { toggleVehiclePanel } from './../../actions';
import styles from './styles.css';

const TopBar = (props) => {
  let title = '';
  if (props.route === '/' || props.route === '/operational') {
    title = 'Operational';
  } else if (props.route === '/history') {
    title = 'Trip History';
  } else if (props.route === '/overview') {
    title = 'Fleet Overview';
  }
  // const titleElement = title !== 'Fleet Overview' ?
  const titleElement = (
    // (
      <div className={styles.screenTitle}>
        { title }
      </div>
    )
    // ) : (
    //   <div className={styles.screenTitle}>
    //     { title }
    //     <div
    //       className={classnames(styles.vehiclePanelToggle, { [styles.opened]: props.isVehiclesPanelOpen })}
    //       onClick={props.toggleVehiclePanel}
    //     >Vehicle list</div>
    //   </div>
    // )
  return (
    <div className={classnames(styles.topBar, {
      [styles.topBarWithoutPadding]: props.route === '/overview'
    })}
    >
      { titleElement }
      <div className={styles.rightSection}>
        <div
          className={styles.printElement}
          // onClick={() => console.log('print')}
        >
          <svg width="34" height="29" viewBox="0 0 34 29">
              <path fill="#888" fillRule="evenodd" d="M29.25 26v1.5a1.5 1.5 0 0 1-1.5 1.5h-21a1.5 1.5 0 0 1-1.5-1.5v-6h24V26zm0-6.75h-3V11h-6a1.5 1.5 0 0 1-1.5-1.5v-6H8.25v15.75h-3V2.044c0-.827.672-1.497 1.5-1.497H18V.5h3.75v.177l.167-.167 6.959 6.959-.532.531h.906v11.25zm-16.875 0h9.75-9.75zM25.334 8L21.75 4.416V8h3.584zM25.152.5a46.33 46.33 0 0 1 1.799 0h-1.8zm5.598 12.75h1.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-1.5v-12zm-27 0v12h-1.5a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5h1.5zm8.625.75h9.75a1.125 1.125 0 1 1 0 2.25h-9.75a1.125 1.125 0 0 1 0-2.25zm0-5.25h2.25a1.125 1.125 0 1 1 0 2.25h-2.25a1.125 1.125 0 0 1 0-2.25zM8.25 24.5V26h18v-1.5h-18z"/>
          </svg>
        </div>
        <div
          className={styles.userSection}
        >
          <div className={styles.userName}>
            <span className={styles.user}>Demo User</span>
            <span className={styles.userPic} />
          </div>
          <div className={styles.userName}>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText="Log out"
                onClick={props.logout}
              />
            </IconMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
  // isVehiclesPanelOpen: state.toJS().inner.demo.isVehiclesPanelOpen,
// });

const mapDispatchToProps = dispatch => ({
  toggleVehiclePanel: () => dispatch(toggleVehiclePanel()),
});

export default connect(null, mapDispatchToProps)(TopBar);
