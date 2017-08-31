import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

import styles from './styles.css';

class InstallerOfflineDataItem extends React.Component {

  onClick = (e) => {
    this.props.onChange(e.target.checked, this.props.index);
  }

  render() {
    const {
      index,
      data,
    } = this.props;

    return (
      <div className={styles.item}>
        <label className={styles.item__label}>
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              name={index}
              onChange={this.onClick}
              className={styles.checkbox}
            />
          </div>
          <ul className={styles.info}>
            <li className={styles.info__item}>
              Vehicle name: <span className={styles.info__detail}>{data.name}</span>
            </li>
            <li className={styles.info__item}>
              License: <span className={styles.info__detail}>{data.license}</span>
            </li>
            <li className={styles.info__item}>
              IMEI: <span className={styles.info__detail}>{data.imei}</span>
            </li>
            <li className={styles.info__item}>
              Odometer: <span className={styles.info__detail}>{data.odometer}</span>
            </li>
          </ul>
        </label>
      </div>
    );
  }
}

InstallerOfflineDataItem.propTypes = {
  data: PropTypes.shape({
    imei: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    odometer: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default pure(InstallerOfflineDataItem);
