import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  list: {
    listStyle: 'none',
    padding: 0,
  },

  list__header: {},

  header: {
    display: 'flex',
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#666',
    borderBottom: '1px solid #ddd',
    padding: '0 20px 10px',
  },

  header__name: {
    flex: 1,
    // flexGrow: 0,
    paddingRight: 20,
  },
  header__desc: {
    flex: 1,
    // flexGrow: 0,
    paddingRight: 20,
  },
  header__acton: {},
});

export default classes;
