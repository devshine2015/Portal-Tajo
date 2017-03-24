import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '100%',

    '@media screen and (min-width: 378px)': {
      width: 'auto',
    },
  },

  detail: {
    display: 'inline-block',
    fontWeight: 500,
  },

  title: {
    display: 'inline-block',
    fontWeight: 400,
  },

  lastActive: {
    marginLeft: 8,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.541176)',
  },
});

export default classes;
