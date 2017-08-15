import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { css } from 'aphrodite/no-important';
import {
  Paper,
  TextField,
} from 'material-ui';
import Avatar from './Avatar';
import ForgotPassword from './ForgotPassword';
import classes from './classes';

const STYLES = {
  paper: {
    borderRadius: 10,
  },
};

const getPicture = R.ifElse(R.isNil, R.always(null), R.ifElse(R.has('picture'), R.prop('picture'), R.always(null)));
const getEmail = R.ifElse(R.isNil, R.always(''), R.ifElse(R.has('email'), R.prop('email'), R.always('')));

class LoginForm extends Component {

  state = {
    password: null,
    email: null,
    isLoading: false,
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  renderAvatar() {
    const { profile } = this.props;
    const picture = getPicture(profile);

    if (R.not(R.isNil(picture))) {
      return <Avatar src={picture} />;
    }

    return null;
  }

  render() {
    const defaultEmail = getEmail(this.props.profile);

    return (
      <div className={css(classes.wrapper)}>
        <Paper
          zDepth={2}
          style={STYLES.paper}
        >
          { this.renderAvatar() }
          <div className={css(classes.inn)}>
            <TextField
              fullWidth
              name="email"
              floatingLabelText="Email address"
              defaultValue={defaultEmail}
              onChange={this.onChange}
            />
            <TextField
              fullWidth
              name="password"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChange}
            />
            <ForgotPassword onClick={() => ({})} />
          </div>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
};

LoginForm.defaultProps = {
  profile: {
    picture: 'https://avatars3.githubusercontent.com/u/966154?v=4&s=100',
    email: 'dev@drvr.co',
  },
};

export default LoginForm;
