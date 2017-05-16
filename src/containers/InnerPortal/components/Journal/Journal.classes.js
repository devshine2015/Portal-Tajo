import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  journal: {
    width: 300,
  },

  header: {
    textAlign: 'center',
    // borderBottom: '1px solid #ccc',
  },

  header__text: {
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    lineHeight: '40px',
  },

  entries: {
    listStyleType: 'none',
  },

  entries__item: {
    borderBottom: '1px solid #eaeaea',
  },

  entry: {
    fontSize: 13,
    padding: 10,
  },
});
