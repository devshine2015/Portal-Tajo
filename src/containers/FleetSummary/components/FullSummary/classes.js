import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  fullSummary: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    flexWrap: 'wrap',
  },

  amount: {
    minWidth: '48%',
    minHeight: '48%',
    margin: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount__inn: {
    display: 'flex',
    alignItems: 'center',
    width: 170,
  },
  amount__icon: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amount__col: {
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  amount__title: {
    fontSize: 40,
    fontWeight: 100,
    color: '#aaa',
    lineHeight: '100%',
  },
  amount__help: {
    fontSize: 12,
    marginLeft: 2,
  },
});

export default classes;
