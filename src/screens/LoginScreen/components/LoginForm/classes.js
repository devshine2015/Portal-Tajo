import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

export const LOGIN_BUTTON_SIZE = 80;

const classes = ({ wrapperWidth }) => StyleSheet.create({
  loginFormWrapper: {
    width: wrapperWidth, // default width of wrapper
    position: 'relative', // so we can position some elements like error without visual impact to main layout
    marginTop: 45, // default margin to fit avatar
  },

  inn: {
    position: 'relative',
    padding: '60px 40px 40px',
    transition: 'padding-top .25s',
  },
  inn_short: {
    paddingTop: 40,
  },

  links: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },

  error: {
    width: '100%',
    marginTop: 50,
  },
});

export default classes;

export const linksClasses = StyleSheet.create({
  helper__link: {
    fontSize: 12,
    color: theme.palette.accent1Color,
    outlineColor: theme.palette.accent1Color,

    ':hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
});

export const loginButtonClasses = StyleSheet.create({
  loginButton__wrapper: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%)',
    width: LOGIN_BUTTON_SIZE,
    height: LOGIN_BUTTON_SIZE,
    boxShadow: '0px 2px 8px rgba(0,0,0,.25)',
    borderRadius: '50%',
    overflow: 'hidden',
    fontSize: 40,
    backgroundColor: '#fefefe',
    transition: 'background-color .25s, color .25s',
    cursor: 'pointer',
    display: 'flex',

    ':hover, :focus': {
      backgroundColor: '#f1f1f1',
      outline: 'none',
    },
  },

  loginButton__wrapper_disabled: {
    backgroundColor: '#f1f1f1',
    color: '#aaa',

    ':hover': {
      cursor: 'not-allowed',
    },
  },
});

export const AVATAR_SIZE = 100;
export const avatarClasses = StyleSheet.create({
  avatar: {
    position: 'absolute',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: '50%',
    padding: 5,
    backgroundColor: '#fff',
    marginTop: -AVATAR_SIZE / 2,
    marginLeft: -AVATAR_SIZE / 2,
    left: '50%',
    top: 0,
  },
});
