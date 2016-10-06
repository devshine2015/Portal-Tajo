import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';

import styles from './styles.css';

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
    return (
      <Checkbox
        checked={this.props.isChecked}
        label={this.props.label}
        name={this.props.name}
        onCheck={this.injectProps}
      />
    );
  }
}

Field.propTypes = {
  index: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onCheck: React.PropTypes.func.isRequired,
  source: React.PropTypes.oneOf([
    'events', 'reports',
  ]).isRequired,
};

const PureField = pure(Field);

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
        <PureField
          {...f}
          isChecked={isChecked}
          index={index}
          onCheck={onChange}
          key={f.name}
          source={source}
        />
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
