import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import UpdateIcon from 'material-ui/svg-icons/navigation/refresh';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen';
import ExitFullScreenIcon from 'material-ui/svg-icons/navigation/fullscreen-exit';
import { DateRangeWithButton } from 'components/DateRange';
import classes from './classes';

const Button = ({ onClick, icon }) => {
  return (
    <IconButton onClick={onClick}>
      { React.cloneElement(icon, {
        color: '#cacaca',
        hoverColor: '#777',
      })}
    </IconButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element.isRequired,
};
Button.defaultProps = {
  onClick: null,
};

class JobsHeader extends Component {
  state = {
    showDateRange: false,
  }

  toggleDateRange = () => {
    this.setState({
      showDateRange: !this.state.showDateRange,
    });
  }

  toggleFullScreen = () => {
    const isFullscreen = !this.props.isFullscreen;

    this.props.resize(isFullscreen);
  }

  renderDateRange() {
    const { showDateRange } = this.state;
    const DEFAULT_TEXT = 'another period?';

    if (showDateRange) {
      return ([
        <DateRangeWithButton
          key="dateRange"
          withTime={false}
          onApply={this.props.fetchJobs}
          button={<Button icon={<UpdateIcon />} />}
        />,
        <Button
          key="closeRange"
          onClick={this.toggleDateRange}
          icon={<CloseIcon />}
        />,
      ]);
    }

    return (
      <button
        className={css(classes.datePlaceholder)}
        onClick={this.toggleDateRange}
      >
        { DEFAULT_TEXT }
      </button>
    );
  }

  renderExpander() {
    const icon = this.props.isFullscreen ? <ExitFullScreenIcon /> : <FullscreenIcon />;

    return (
      <Button
        onClick={this.toggleFullScreen}
        icon={icon}
      />
    );
  }

  render() {
    return (
      <div className={css(classes.header)}>
        { this.renderDateRange() }
        { this.props.isResizable && this.renderExpander() }
      </div>
    );
  }
}

JobsHeader.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
  resize: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  isResizable: PropTypes.bool.isRequired,
};

export default JobsHeader;
