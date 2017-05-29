import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  header: {
    margin: '20px 0 15px',
    textAlign: 'center',
  },

  header__main: {
    fontSize: 18,
    marginBottom: 5,
  },

  header__sub: {
    color: 'rgba(0,0,0,.55)',
    fontSize: 14,
  },

  header__sub_highlighted: {
    fontWeight: 600,
    fontSize: 15,
  },
});

export default classes;
