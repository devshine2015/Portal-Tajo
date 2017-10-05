import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {
  makePhrasesShape,
  translate,
} from 'utils/i18n';
import FormComponents from 'components/User/FormComponents';
import DetailPopupForm from 'components/User/DetailPopupForm';
import phrases from './PropTypes';

class PasswordForm extends React.Component {
  state = {
    newPass: undefined,
    repeat: undefined,
    repeatedCorrectly: false,
    isFetching: false,
  }

  onPasswordChange = (e) => {
    const { value } = e.target;

    this.setState({
      repeatedCorrectly: value === this.state.repeat,
      newPass: value,
    });
  }

  onRepeatType = (e) => {
    const { value } = e.target;

    this.setState({
      repeatedCorrectly: value === this.state.newPass,
      repeat: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isFetching: true,
    }, () => {
      this.props.onSubmit(this.state.newPass);
    });
  }

  focus = (ref) => {
    if (!ref) return;

    ref.focus();
  }

  render() {
    return (
      <DetailPopupForm
        headerText={this.props.translations.change_password}
        isFetching={this.state.isFetching}
      >
        <TextField
          hintText={this.props.translations.new_password}
          onChange={this.onPasswordChange}
          type="password"
          name="newPass"
          ref={this.focus}
        />
        <TextField
          hintText={this.props.translations.repeat_password}
          onChange={this.onRepeatType}
          type="password"
          name="repeat"
        />

        <FormComponents.Buttons
          onSubmit={this.onSubmit}
          onCancel={this.props.closeForm}
          disabled={this.state.repeatedCorrectly}
          mainLabel={this.props.translations.submit}
        />
      </DetailPopupForm>
    );
  }
}

PasswordForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

export default translate(phrases)(PasswordForm);
