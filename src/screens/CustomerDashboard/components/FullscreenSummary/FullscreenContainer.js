import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { isFeatureSupported } from 'configs';
import takeVendorPrefixedProp from 'utils/vendors';
import { fullscreenContainerClasses } from './classes';

class FullscreenContainer extends React.Component {
  ref = null;
  state = {
    hasFullscreenElement: false,
  };

  componentDidMount() {
    this.toFullscreenMode();
  }

  toFullscreenMode() {
    if (this.ref) {
      const requestFullscreen = takeVendorPrefixedProp(this.ref, isFeatureSupported('prefix'), 'requestFullscreen');

      if (requestFullscreen !== undefined) {
        this.setState(() => ({
          hasFullscreenElement: true,
        }), () => {
          this.ref[requestFullscreen]();
        });
      }
    }
  }

  saveRef = (ref) => {
    if (ref !== null) {
      this.ref = ref;
    }
  }

  render() {
    return (
      <div
        className={css(fullscreenContainerClasses.fullscreenContainer)}
        ref={this.saveRef}
      >
        { this.state.hasFullscreenElement && this.props.children }
      </div>
    );
  }
}

FullscreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FullscreenContainer;
