import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
  },
  group__title: {
    fontSize: 18,
    color: '#999',
    fontWeight: 200,
    marginBottom: 10,
  },
  group__inn: {
    display: 'flex',
    flex: 1,
  },
});

export default classes;
