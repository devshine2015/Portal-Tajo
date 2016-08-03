import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';

import { red500, yellow500, blue100} from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDrvr from 'material-ui/svg-icons/social/person';
import FltrDrvr from 'material-ui/svg-icons/alert/warning';

class PowerFilter extends React.Component {
  render() {
    return (
      <div className={styles.searchBoxContainer}>
        <TextField
          hintText="Search"
        />
        <div className={styles.presetBtnsArea}>
        <IconButton tooltip="Select Static">
          <ActionHome color={yellow500} />
        </IconButton>
        <IconButton tooltip="No drivers">
          <ActionDrvr color={blue100} />
        </IconButton>
        <IconButton tooltip="Alarm">
          <FltrDrvr color={red500} />
        </IconButton>
        </div>
      </div>
    );
  }
}

const PurePowerFilter = pure(PowerFilter);

export default PurePowerFilter;
