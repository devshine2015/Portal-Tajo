import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';


class PowerFilter extends React.Component {
  render() {
    return (
      <div className={styles.searchBoxContainer}>
        <TextField
          hintText="Search"
        />
        <IconButton tooltip="Font Icon">
          <FontIcon className="muidocs-icon-action-home" />
        </IconButton>
      </div>
    );
  }
}

const PurePowerFilter = pure(PowerFilter);

export default PurePowerFilter;
