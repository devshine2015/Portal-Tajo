import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

export const AVATAR_SIZE = 100;
export const LOGIN_BUTTON_SIZE = 80;

export default StyleSheet.create({
  wrapper: {
    width: 400,
    marginTop: 150,
    height: '100%', // make sure wrapper has height of the childrens
    position: 'relative', // so we can position some elements like error without visual impact to main layout
  },

  inn: {
    position: 'relative',
    padding: '100px 40px 70px',
    transition: 'padding-top .25s',
  },
  inn_short: {
    paddingTop: 40,
  },

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

  links: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },

  helper__link: {
    fontSize: 12,
    color: theme.palette.accent1Color,
    outlineColor: theme.palette.accent1Color,

    ':hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

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

  error: {
    position: 'absolute',
    width: '100%',
    marginTop: -50,
  },
});
