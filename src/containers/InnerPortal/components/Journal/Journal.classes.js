import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  journal: {
    width: 300,
  },

  header: {
    textAlign: 'center',
  },

  header__text: {
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    lineHeight: '40px',
  },

  placeholder: {
    fontSize: 12,
    textTransform: 'uppercase',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#999',
  },

  entries: {
    listStyleType: 'none',
    maxHeight: '23vmax',
    overflowY: 'auto',
  },

  entries__item: {
    borderBottom: '1px solid #eaeaea',
  },

  entry: {
    fontSize: 13,
    padding: 10,
  },
});
