import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import styles from './styles.css';

const TopBar = (props) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.screenName}>
        {/* Operational */}
      </div>
      <div className={styles.rightSection}>
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
  );
};

TopBar.propTypes = {
  // title: PropTypes.element.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TopBar;
