import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  kinds: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  list: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },

  kindWrapper: {
    margin: '0 5px',

    ':first-child': {
      marginLeft: 0,
    },

    ':last-child': {
      marginRight: 0,
    },
  },

  kind: {
    borderRadius: '50%',
  },

  label: {
    textAlign: 'right',
    color: 'rgba(0,0,0,.55)',
    fontWeight: 600,
    fontSize: 14,
  },
});
