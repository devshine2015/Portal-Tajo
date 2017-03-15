import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  permissions: {},

  permissions__header: {
    marginBottom: 5,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.541176)',
    textTransform: 'capitalize',
  },

  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    margin: '0 -5px',
  },

  list__item: {
    margin: 5,
  },
});

export default classes;
