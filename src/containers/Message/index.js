import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Toaster from 'components/Toaster';
import { hideMessage, resetMessage } from './actions';

import styles from './styles.css';

class Message extends React.Component {

  componentWillReceiveProps(nextProps) {
    // hide toaster after 5 sec
    if (!this.props.show && nextProps.show) {
      window.setTimeout(this.handleHiding, 5000);
    }
  }

  handleHiding = () => {
    this.props.hideMessage();
    window.setTimeout(this.props.resetMessage, 1000);
  }

  render() {
    return (
      <div className={styles.message}>
        <Toaster
          isError={this.props.isError}
          show={this.props.show}
          text={this.props.message}
        />
      </div>
    );
  }
}

Message.propTypes = {
  isError: React.PropTypes.bool.isRequired,
  hideMessage: React.PropTypes.func.isRequired,
  message: React.PropTypes.string,
  resetMessage: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  ...state.get('message'),
});
const mapDispatch = { hideMessage, resetMessage };

const PureMessage = pure(Message);

export default connect(mapState, mapDispatch)(PureMessage);
