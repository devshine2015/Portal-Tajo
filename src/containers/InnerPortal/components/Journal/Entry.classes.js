import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

export default StyleSheet.create({
  entry: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 15px',
    transition: 'background-color .25s',

    ':hover': {
      backgroundColor: '#f1f1f1',
    },
  },

  entry_unread: {
    backgroundColor: 'rgba(0,135,255,.1)',

    ':hover': {
      backgroundColor: 'rgba(0,135,255,.25)',
    },
  },

  details: {
    fontSize: 14,
  },

  details__header: {
    lineHeight: '110%',
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.accent1Color,
  },

  details__time: {
    color: '#777',
    fontSize: 11,
    fontWeight: 200,
  },

  details__body: {
    lineHeight: '120%',
  },

  iconWrapper: {
    marginRight: 10,
  },

  dissmiss: {
    position: 'absolute',
    top: 6,
    right: 10,
    borderRadius: '50%',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color .25s',

    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#ddd',
    },
  },

  dissmiss__icon: {},
});
