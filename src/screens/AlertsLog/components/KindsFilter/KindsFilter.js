import React, { Component } from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ALERT_KINDS } from 'services/AlertsSystem/alertKinds';
import classes from './classes';

const FilterKind = muiThemeable()(({
  niceName,
  kind,
  onClick,
  icon,
  isActive,
  muiTheme,
}) => {
  const click = () => onClick(kind);

  return (
    <IconButton
      onClick={click}
      tooltip={niceName}
      className={css(classes.kind)}
      style={{
        backgroundColor: isActive ? muiTheme.palette.primary4Color : '#f1f1f1',
      }}
    >
      { icon }
    </IconButton>
  );
});

FilterKind.propTypes = {
  niceName: React.PropTypes.string.isRequired,
  kind: React.PropTypes.string.isRequired,
  icon: React.PropTypes.element.isRequired,
  onClick: React.PropTypes.func.isRequired,
  isActive: React.PropTypes.bool.isRequired,
};


class KindsFilter extends Component {

  renderKinds() {
    return ALERT_KINDS.map((kind) => {
      const isActive = this.props.activeFilters.indexOf(kind.value) !== -1;
      const icon = React.cloneElement(kind.icon, {
        color: isActive ? '#fff' : '#bbb',
      });

      return (
        <FilterKind
          key={kind.value}
          icon={icon}
          onClick={this.props.onKindsChange}
          isActive={isActive}
          kind={kind.value}
          niceName={kind.niceName}
        />
      );
    });
  }

  render() {
    return (
      <div className={css(classes.kinds)}>
        { this.renderKinds() }
      </div>
    );
  }
}

KindsFilter.propTypes = {
  onKindsChange: React.PropTypes.func.isRequired,
  activeFilters: React.PropTypes.instanceOf(List).isRequired,
};

export default KindsFilter;
