import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import styles from './styles.css';

const warnMessage = 'Toggle if you need to pick more vehicles';

const STYLES = {
  toggleRoot: {
    width: 'auto',
    display: 'inline-block',
  },
  toggleLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.498039)',
    lineHeight: '120%',
    display: 'inline-block',
    width: 'auto',
  },
};

const Hint = () => <div className={styles.hint}>*Pick up to 3 vehicles for getting events</div>;

class RawDataButtons extends React.Component {

  render() {
    const containerClassName = cs(styles.container, this.props.containerClassName);
    const btnClassName = cs(styles.button, this.props.buttonClassName);

    return (
      <div className={containerClassName}>
        <div className={styles.top}>
          <RaisedButton
            className={btnClassName}
            label="Save raw data"
            onClick={this.props.onClick}
            disabled={this.props.disabled}
            primary
          />
          {/*<Toggle
            className={styles.toggle}
            label={warnMessage}
            labelPosition="right"
            style={STYLES.toggleRoot}
            labelStyle={STYLES.toggleLabel}
          />*/}
        </div>
        {/*<Hint />*/}
      </div>
    );
  }
}

RawDataButtons.propTypes = {
  // className for container
  containerClassName: React.PropTypes.string,
  // button className
  buttonClassName: React.PropTypes.string,
  // property to disable primary button
  disabled: React.PropTypes.bool.isRequired,
  // callback on primary button click
  onClick: React.PropTypes.func.isRequired,
};

export default pure(RawDataButtons);
