import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  barContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    // zIndex: 1100,
    // boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, .5)',

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
