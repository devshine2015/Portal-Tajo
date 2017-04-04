import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  widget: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 600,

    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  widget__title: {
    fontSize: 18,
    color: '#999',
    fontWeight: 200,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  widget__inn: {
    display: 'flex',
    flex: 1,
  },
});

export default classes;
