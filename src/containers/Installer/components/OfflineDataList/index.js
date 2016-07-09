import React from 'react';
import pure from 'recompose/pure';
import FlatButton from 'material-ui/FlatButton';
import InputFieldWrapper from 'components/InputFieldWrapper';
import InstallerOfflineDataItem from '../OfflineDataItem';

import styles from './styles.css';

const Title = () => <p className={styles.title}>Saved data</p>;

const InstallerOfflineData = ({
  data,
  cleanData,
  sendData,
  isOnline,
  indexes,
  toggleSaving,
}) => {
  const list = data.map((d, i) => (
    <li
      className={styles.offline__item}
      key={d.id}
    >
      <InstallerOfflineDataItem
        data={d}
        index={i}
        onChange={toggleSaving}
      />
    </li>
  ));

  const cleanBtnDisabled = indexes.size === 0;
  const sendBtnDisabled = !isOnline || indexes.size === 0;

  return (
    <div className={styles.offline}>
      <Title />
      <ul className={styles.offline__list}>
        { list }
      </ul>
      <InputFieldWrapper inlineClass={styles.controlWrapper_offlineButtons}>
        <FlatButton
          disabled={sendBtnDisabled}
          label="Send checked"
          primary
          onClick={sendData}
        />
        <FlatButton
          disabled={cleanBtnDisabled}
          label="Clean checked"
          onClick={cleanData}
        />
      </InputFieldWrapper>
    </div>
  );
};

InstallerOfflineData.propTypes = {
  cleanData: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  isOnline: React.PropTypes.bool.isRequired,
  sendData: React.PropTypes.func.isRequired,
  indexes: React.PropTypes.arrayOf(
    React.PropTypes.number
  ).isRequired,
  toggleSaving: React.PropTypes.func.isRequired,
};

export default pure(InstallerOfflineData);
