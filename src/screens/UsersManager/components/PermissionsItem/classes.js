import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  permission: {
    display: 'flex',
    alignItems: 'center',
  },

  permission__name: {
    flex: 1,
    flextGrow: 0,
    paddingRight: 20,
  },
  permission__desc: {
    flex: 1,
    flextGrow: 0,
    fontSize: 14,
  },
  permission__actions: {},
});

export default classes;
