import React, { Component, PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import UpdateIcon from 'material-ui/svg-icons/navigation/refresh';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { DateRangeWithButton } from 'components/DateRange';
import classes from './classes';

const RefreshButton = ({ onClick, icon }) => {
  return (
    <IconButton onClick={onClick}>
      { React.cloneElement(icon, {
        color: '#cacaca',
        hoverColor: '#777',
      })}
    </IconButton>
  );
};

RefreshButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element.isRequired,
};
RefreshButton.defaultProps = {
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

  renderDateRange() {
    const { showDateRange } = this.state;
    const DEFAULT_TEXT = 'another period?';

    if (showDateRange) {
      return ([
        <DateRangeWithButton
          key="dateRange"
          withTime={false}
          onApply={this.props.fetchJobs}
          button={<RefreshButton icon={<UpdateIcon />} />}
        />,
        <RefreshButton
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

  render() {
    return (
      <div className={css(classes.header)}>
        { this.renderDateRange() }
      </div>
    );
  }
}

JobsHeader.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
};

export default JobsHeader;
