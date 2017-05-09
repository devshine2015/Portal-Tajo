import { StyleSheet } from 'aphrodite/no-important';

const LIST_LEFT_PADDING = 20 + 5;

const classes = StyleSheet.create({
  wrapper: {},

  header: {
    margin: '20px 0 15px',
    textAlign: 'center',
  },

  header__main: {},

  header__sub: {
    color: 'rgba(0,0,0,.55)',
    fontSize: 14,
  },

  listWrapper: {
    position: 'relative',
    maxWidth: 350,

    ':before': {
      content: "''",
      position: 'absolute',
      left: -LIST_LEFT_PADDING,
      width: 6,
      height: '100%',
      backgroundColor: 'rgba(221, 221, 221, .6)',
    },
  },
});

export default classes;
