import { StyleSheet } from 'aphrodite/no-important';

const contentPadding = 20;

const classes = StyleSheet.create({
// ---- section
  sectionContainer: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2);',
    backgroundColor: '#ddd',
    ':nth-child(odd)': {
      backgroundColor: '#f4f4f4',
    },
  },
// ---- content
  content: {
    maxWidth: 1000,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content__padding: {
    padding: 20,
  },
  content__center: {
    alignItems: 'center',
  },
// ---- header
  header: {
    display: 'flex',
    // marginBottom: 20,
    paddingLeft: contentPadding,
  },
  header__content: {
    flexGrow: 1,
  },
  header__icon: {
    marginRight: 12,
  },
  header__text: {
    fontWeight: 'bolder',
    fontSize: 32,
    textTransform: 'capitalize',
    color: 'rgba(0, 150, 136, 0.3)',
  },
  header__actionWrapper: {},

});

export default classes;
