import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import pure from 'recompose/pure';
import Button from 'components/Button';
import { hideNotification } from './actions';
import { sendFromStorage } from 'containers/OfflineData/actions';

import styles from './styles.css';

class Notification extends React.Component {

  handleSend = () => {
    this.props.sendFromStorage();
    this.props.hideNotification();
  }

  render() {
    const className = classnames(styles.notification, {
      [styles.notification_show]: this.props.show,
    });

    return (
      <div className={className}>
        <div className={styles.notification__inn}>
          You have saved data on your device
          <div className={styles.notification__buttons}>
            <Button
              modifierClass="button_main button_small"
              inlineClass={styles.notification__button}
              text="send"
              onClick={this.handleSend}
            />
            <Button
              modifierClass="button_transparent button_small"
              inlineClass={styles.notification__button}
              text="cancel"
              onClick={this.props.hideNotification}
            />
          </div>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  hideNotification: React.PropTypes.func.isRequired,
  sendFromStorage: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  show: state.getIn(['notification', 'show']),
});
const mapDispatch = {
  hideNotification,
  sendFromStorage,
};

const PureNotification = pure(Notification);

export default connect(mapState, mapDispatch)(PureNotification);
