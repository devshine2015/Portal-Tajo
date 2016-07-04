import React from 'react';
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
              Vehicle name: <span className={styles.info__detail}>{name}</span>
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
  data: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    imei: React.PropTypes.string.isRequired,
    license: React.PropTypes.string.isRequired,
    odometer: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  index: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default pure(InstallerOfflineDataItem);
