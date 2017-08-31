import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ALERT_KINDS } from 'services/AlertsSystem/alertKinds';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import phrases from '../../PropTYpes';
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
  const style = {
    backgroundColor: isActive ? muiTheme.palette.primary4Color : '#f1f1f1',
  };

  return (
    <div className={css(classes.kindWrapper)}>
      <IconButton
        onClick={click}
        tooltip={niceName}
        className={css(classes.kind)}
        style={style}
      >
        { icon }
      </IconButton>
    </div>
  );
});

FilterKind.propTypes = {
  niceName: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
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
    const containerClassName = cs(css(classes.kinds), this.props.containerClassName);
    const listClassName = cs(css(classes.list), this.props.listClassName);
    const labelClassName = cs(css(classes.label), this.props.labelClassName);

    return (
      <div className={containerClassName}>
        <span className={labelClassName}>
          { `${this.props.translations.filter_by_type}:` }
        </span>
        <div className={listClassName}>
          { this.renderKinds() }
        </div>
      </div>
    );
  }
}

KindsFilter.propTypes = {
  onKindsChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.instanceOf(List).isRequired,
  containerClassName: PropTypes.string,
  listClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  translations: makePhrasesShape(phrases).isRequired,
};

KindsFilter.defaultProps = {
  containerClassName: '',
  listClassName: '',
  labelClassName: '',
};

export default translate(phrases)(KindsFilter);
