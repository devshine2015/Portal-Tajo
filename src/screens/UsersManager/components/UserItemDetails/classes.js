import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  details: {
    padding: '0 56px',
  },

  details__item: {
    display: 'flex',
    marginBottom: 10,
    fontSize: 16,
  },

  details__col: {
    marginRight: 10,
    minWidth: 80,
  },

  details__title: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.541176)',
  },

  details__resetBtn: {
    marginTop: 10,
  },
});

export default classes;
