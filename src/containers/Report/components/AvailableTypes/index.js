import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const STYLES = {
  fieldRoot: {
    display: 'block',
    flexShrink: 0,
    maxWidth: 240,
  },
  label: {
    fontSize: 15,
  },
  helpButton: {
    width: 30,
    height: 30,
    padding: 3,
  },
};

const Help = ({ tooltip }) => (
  <IconButton
    style={STYLES.helpButton}
    iconStyle={STYLES.helpIcon}
    tooltip={tooltip}
    tooltipPosition="top-center"
  >
    <HelpIcon />
  </IconButton>
);

Help.propTypes = {
  tooltip: PropTypes.string.isRequired,
};

class Field extends React.Component {

  injectProps = event => {
    this.props.onCheck({
      event,
      value: !this.props.isChecked,
      index: this.props.index,
      source: this.props.source,
    });
  }

  render() {
    const label = this.props.translations[this.props.name];

    return (
      <Checkbox
        checked={this.props.isChecked}
        label={ label }
        labelStyle={STYLES.label}
        name={this.props.name}
        onCheck={this.injectProps}
        disabled={this.props.disabled}
        style={STYLES.fieldRoot}
      />
    );
  }
}

Field.propTypes = {
  index: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  source: PropTypes.oneOf([
    'events', 'reports',
  ]).isRequired,

  translations: phrasesShape.isRequired,
};

Field.defaultProps = {
  translations: phrases,
  disabled: false,
};

const PureField = pure(translate(phrases)(Field));

const AvailableTypes = ({
  checkedFields,
  fields,
  onChange,
  source,
  title,
}) => (
  <div className={styles.availableTypes}>

    { !!title && <div className={styles.title}>{title}</div> }

    {fields.map((f, index) => {
      const isChecked = Boolean(checkedFields[f.name]);

      return (
        <div className={styles.typeWrapper} key={index}>
          <PureField
            {...f}
            isChecked={isChecked}
            index={index}
            onCheck={onChange}
            key={f.name}
            source={source}
          />

          { f.help && <Help tooltip={f.help} /> }

        </div>
      );
    })}
  </div>
);

AvailableTypes.propTypes = {
  checkedFields: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  source: PropTypes.oneOf([
    'events', 'reports',
  ]).isRequired,
  title: PropTypes.string,
};

AvailableTypes.defaultProps = {
  title: undefined,
};

export default pure(AvailableTypes);
