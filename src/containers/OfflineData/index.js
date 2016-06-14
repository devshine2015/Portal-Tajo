import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { List } from 'immutable';
import pure from 'recompose/pure';
import Button from 'components/Button';
import InputFieldWrapper from 'components/InputFieldWrapper';
import OfflineDataItem from 'components/OfflineDataItem';
import { cleanOfflineData, sendFromStorage } from './actions';

import styles from './styles.css';

const Title = () => <p className={styles.title}>Saved data</p>;

class OfflineData extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      indexes: new List(),
    };

    this.cleanChecked = this.cleanChecked.bind(this);
    this.sendChecked = this.sendChecked.bind(this);
  }

  toggleSaving = (checked, index) => {
    const state = this.state.indexes;
    let nextState;

    if (checked) {
      nextState = state.push(index);
    } else {
      nextState = state.delete(index);
    }

    this.setState({
      indexes: nextState,
    });
  }

  sendChecked = () => {
    this.props.sendFromStorage(this.state.indexes.toArray());
    this.resetIndexes();
  }

  cleanChecked = () => {
    this.props.cleanOfflineData(this.state.indexes.toArray());
    this.resetIndexes();
  }

  resetIndexes() {
    this.setState({
      indexes: new List(),
    });
  }

  render() {
    const list = this.props.data.map((d, i) => (
      <li
        className={styles.offline__item}
        key={d.id}
      >
        <OfflineDataItem
          {...d}
          index={i}
          onChange={this.toggleSaving}
        />
      </li>
    ));

    const buttonsDisabled = this.state.indexes.size === 0;

    const sendBtnClassName = classnames('button_small', {
      button_disabled: !this.props.isOnline || buttonsDisabled,
    });
    const cleanBtnClassName = classnames('button_small', {
      button_disabled: buttonsDisabled,
    });

    return (
      <div className={styles.offline}>
        <Title />
        <ul className={styles.offline__list}>
          { list }
        </ul>
        <InputFieldWrapper inlineClass={styles.controlWrapper_offlineButtons}>
          <Button
            disabled={!this.props.isOnline}
            modifierClass={sendBtnClassName}
            onClick={this.sendChecked}
            text="Send checked"
          />
          <Button
            disabled={buttonsDisabled}
            modifierClass={cleanBtnClassName}
            onClick={this.cleanChecked}
            text="Clean checked"
          />
        </InputFieldWrapper>
      </div>
    );
  }
}

OfflineData.propTypes = {
  cleanOfflineData: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  isOnline: React.PropTypes.bool.isRequired,
  sendFromStorage: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  data: state.getIn(['offlineData', 'data']).toArray(),
  isOnline: state.getIn(['global', 'isOnline']),
});
const mapDispatch = {
  cleanOfflineData,
  sendFromStorage,
};

const PureOfflineData = pure(OfflineData);

export default connect(mapState, mapDispatch)(PureOfflineData);
