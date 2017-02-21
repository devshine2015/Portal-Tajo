import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import translator from 'utils/translator';

import styles from './styles.css';
import phrases, { phrasesShape } from './phrases.lang';

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
  tooltip: React.PropTypes.string.isRequired,
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
        disabled={this.props.disabled || false}
        style={STYLES.fieldRoot}
      />
    );
  }
}

Field.propTypes = {
  index: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onCheck: React.PropTypes.func.isRequired,
  source: React.PropTypes.oneOf([
    'events', 'reports',
  ]).isRequired,

  translations: phrasesShape.isRequired,
};

const PureField = pure(translator(phrases)(Field));

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
  checkedFields: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  source: React.PropTypes.oneOf([
    'events', 'reports',
  ]).isRequired,
  title: React.PropTypes.string,
};

export default pure(AvailableTypes);
