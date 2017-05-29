import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  kinds: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  list: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
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
