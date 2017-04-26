import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  header: {
    display: 'flex',
    marginBottom: 20,
  },

  header__content: {
    flexGrow: 1,
  },
  header__text: {
    fontWeight: 'bolder',
    fontSize: 32,
    textTransform: 'capitalize',
    marginLeft: 12,
    color: 'rgba(0, 150, 136, 0.6)',
  },

  actionWrapper: {},
});

export default classes;
