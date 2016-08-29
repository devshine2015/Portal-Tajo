import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';

import styles from './styles.css';

class Field extends React.Component {

  onChange = (e) => {
    this.props.onCheck(e, e.target.checked, this.props.index);
  }

  injectIndex = (event, value) => {
    this.props.onCheck(event, value, this.props.index);
  }

  render() {
    if (!this.props.noMaterialUI) {
      return (
        <Checkbox
          checked={this.props.isChecked}
          label={this.props.label}
          name={this.props.name}
          onCheck={this.injectIndex}
        />
      );
    }

    return (
      <div className={styles.simple}>
        <label>
          <input
            type="checkbox"
            checkedDefault={this.props.isChecked}
            name={this.props.name}
            onChange={this.onChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

Field.propTypes = {
  index: React.PropTypes.number.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onCheck: React.PropTypes.func.isRequired,
  noMaterialUI: React.PropTypes.bool,
};

const PureField = pure(Field);

const AvailableFields = ({
  checkedFields,
  fields,
  onChange,
  noMaterialUI = false,
}) => (
  <div className="availableFields">
    {fields.map((f, index) => {
      const isChecked = Boolean(checkedFields[f.name]);

      return (
        <PureField
          {...f}
          isChecked={isChecked}
          index={index}
          onCheck={onChange}
          key={f.name}
          noMaterialUI={noMaterialUI}
        />
      );
    })}
  </div>
);

AvailableFields.propTypes = {
  checkedFields: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  noMaterialUI: React.PropTypes.bool,
};

export default pure(AvailableFields);
