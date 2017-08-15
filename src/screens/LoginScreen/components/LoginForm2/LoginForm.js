import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { css } from 'aphrodite/no-important';
import cs from 'classnames';
import {
  Paper,
  TextField,
} from 'material-ui';
import Avatar from './Avatar';
import HelperLink from './HelperLink';
import LoginButton from './LoginButton';
import classes from './classes';

const STYLES = {
  paper: {
    borderRadius: 10,
  },
};


const getPicture = R.ifElse(R.isNil, R.always(null), R.ifElse(R.has('picture'), R.prop('picture'), R.always(null)));
const getEmail = R.ifElse(R.isNil, R.always(''), R.ifElse(R.has('email'), R.prop('email'), R.always('')));

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      email: getEmail(props.profile),
      isLoading: false,
      showProfile: R.not(R.isEmpty(props.profile)),
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.changeLoadingState(true);

    // this.props.route.auth.traditionalLogin(this.state.username, this.state.password, (profile) => {
      // this.changeLoadingState(false);
      // this.props.onLoginSuccess(profile);
    // }, () => {
      // this.changeLoadingState(false);
      // this.props.onLoginFailure();
    // });
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  changeLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  hideProfile = () => {
    this.setState({
      showProfile: false,
      email: '',
    });
  }

  renderAvatar() {
    const { profile } = this.props;
    const picture = getPicture(profile);

    if (R.not(R.isNil(picture))) {
      return (
        <Avatar
          src={picture}
          show={this.state.showProfile}
        />
      );
    }

    return null;
  }

  render() {
    const innClassName = cs(css(classes.inn), {
      [css(classes.inn_short)]: !this.state.showProfile,
    });

    return (
      <div className={css(classes.wrapper)}>
        <Paper
          zDepth={2}
          style={STYLES.paper}
        >
          { this.renderAvatar() }
          <form
            className={innClassName}
            onSubmit={this.onSubmit}
          >
            <TextField
              fullWidth
              name="email"
              floatingLabelText="Email address"
              value={this.state.email}
              onChange={this.onChange}
            />
            <TextField
              fullWidth
              name="password"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChange}
            />
            <div className={css(classes.links)}>
              <HelperLink onClick={() => ({})} text="Forgot password?" />
              { this.state.showProfile && <HelperLink onClick={this.hideProfile} text="Not me" /> }
            </div>
            <LoginButton
              onClick={this.onSubmit}
              isLoading={this.state.isLoading}
            />
          </form>
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
