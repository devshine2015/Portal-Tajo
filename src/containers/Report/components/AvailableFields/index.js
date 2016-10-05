import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';

class Field extends React.Component {

  injectProps = event => {
    this.props.onCheck(event, !this.props.isChecked, this.props.index, 'report');
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
};

const PureField = pure(Field);

const AvailableFields = ({
  checkedFields,
  fields,
  onChange,
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
        />
      );
    })}
  </div>
);

AvailableFields.propTypes = {
  checkedFields: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default pure(AvailableFields);
