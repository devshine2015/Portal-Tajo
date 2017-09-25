import { StyleSheet } from 'aphrodite/no-important';

const contentPadding = 20;

const classes = StyleSheet.create({
// ---- top level container, screen with powerList on left side
  screenWithList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    // backgroundColor: '#ccc',
    backgroundColor: 'white',
  },
// ---- screen "info" content - what we have on right from the PowerList
  fixedContent: {
    minWidth: '1px',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: '250px',
    // padding: '0 15px',

    '@media print': {
      marginLeft: 0,
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
// ---- section
  sectionContainer: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2);',
    backgroundColor: '#ddd',
    ':nth-child(odd)': {
      backgroundColor: '#f4f4f4',
    },
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
// ---- row
  row: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
});

export default classes;

export const placeholderClasses = StyleSheet.create({
  placeholder: {},
  defaultText: {
    textAlign: 'center',
    color: '#aaa',
    fontWeight: 700,
    fontSize: 25,
  },
});
