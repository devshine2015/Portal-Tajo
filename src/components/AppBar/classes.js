import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  barContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1100,

    '@media print': {
      display: 'none',
    },
  },

  rightContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  logoutWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
});

export default classes;
