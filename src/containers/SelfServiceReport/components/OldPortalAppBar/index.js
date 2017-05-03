import React from 'react';
import pure from 'recompose/pure';
import {
  AppBar,
  FlatButton,
  IconButton,
} from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';

import styles from './styles.css';

const STYLES = {
  title: {
    textAlign: 'center',
    fontSize: '2em',
    fontWight: 500,
    color: 'rgba(0,0,0,.5)',
  },
  bar: {
    backgroundColor: '#ffab40',
    marginBottom: 20,
    position: 'fixed',
    top: 0,
  },
  icon: {
    color: 'rgba(0,0,0,.5)',
    fill: 'rgba(0,0,0,.5)',
  },
};

class OldPortalAppBar extends React.Component {

  render() {
    return (
      <AppBar
        className={styles.oldAppBar}
        zDepth={3}
        title="Custom Reports"
        titleStyle={STYLES.title}
        style={STYLES.bar}
        iconStyleLeft={STYLES.icon}
        iconElementLeft={(
          <IconButton onClick={this.props.goHome}>
            <ActionHome />
          </IconButton>
        )}
        iconElementRight={(
          <FlatButton
            onClick={this.props.logout}
            label="logout"
            style={STYLES.icon}
          />
        )}
      />
    );
  }
}

OldPortalAppBar.propTypes = {
  logout: React.PropTypes.func.isRequired,
  goHome: React.PropTypes.func.isRequired,
};

export default pure(OldPortalAppBar);
