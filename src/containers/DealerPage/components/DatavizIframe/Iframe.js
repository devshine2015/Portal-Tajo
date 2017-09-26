import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Frame = ({ src }) => (
  <iframe
    src={src}
    style={{
      height: '100%',
      width: '100%',
    }}
  />
);

Frame.propTypes = {
  src: PropTypes.string.isRequired,
};

const FrameTitle = ({ text, onClick, collapsible }) => (
  <div
    className={css(classes.title, collapsible && classes.title_collapsible)}
    onClick={onClick}
  >
    {text}
  </div>
);

FrameTitle.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  collapsible: PropTypes.bool.isRequired,
};

class DatavizFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: props.collapsed,
    };
  }

  toggleCollapse = () => {
    if (!this.props.collapsible) return;

    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const { src, title, maxHeight, collapsible } = this.props;
    const bodyStyle = {
      height: this.state.isCollapsed ? 0 : maxHeight,
    };

    return (
      <div className={css(classes.wrap)}>
        { title && (
          <FrameTitle
            onClick={this.toggleCollapse}
            text={title}
            collapsible={collapsible}
          />
        )}
        <div className={css(classes.body)} style={bodyStyle}>
          <Frame src={src} />
        </div>
      </div>
    );
  }
}

DatavizFrame.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  maxHeight: PropTypes.number,
};

DatavizFrame.defaultProps = {
  title: undefined,
  collapsible: false,
  collapsed: false,
  maxHeight: '100%',
};

export default DatavizFrame;
