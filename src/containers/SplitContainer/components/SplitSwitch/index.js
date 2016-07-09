import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import { FlatButton } from 'material-ui';


class SplitSwitch extends React.Component {

  onChangeClick = (idx) => {
    this.props.clickCallback(idx);
  }

  render() {
    return (
      <div className={styles.splitSwitchContainer}>
        <FlatButton
          label="Map"
          onClick={() => {this.onChangeClick(0);}}
        />
        <FlatButton
          label="Tactical"
          onClick={() => {this.onChangeClick(1);}}
        />
        <FlatButton
          label="Split"
          onClick={() => {this.onChangeClick(2);}}
        />
      </div>
    );
  }
}

SplitSwitch.propTypes = {
  clickCallback: React.PropTypes.func.isRequired,
};

const PureSplitSwitch = pure(SplitSwitch);

export default PureSplitSwitch;
