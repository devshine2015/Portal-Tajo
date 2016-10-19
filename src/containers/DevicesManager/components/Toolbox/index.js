import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Total from '../Total';
import DeviceSearch from '../DeviceSearch';

import styles from './styles.css';

class Toolbox extends React.Component {
  render() {
    return (
      <div className={styles.toolbox}>
        <div className={styles.totalContainer}>
          <Total />
        </div>
        <div className={styles.searchContainer}>
          <DeviceSearch />
        </div>
      </div>
    );
  }
}

Toolbox.propTypes = {};

const mapState = null;
const mapDispatch = null;

const PureToolbox = pure(Toolbox);

export default connect(mapState, mapDispatch)(PureToolbox);
