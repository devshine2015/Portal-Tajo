import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  permission: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    fontSize: 14,
    transition: 'background-color .25s',

    ':hover': {
      backgroundColor: '#f1f1f1',
    },
  },

  permission__name: {
    flex: 1,
    paddingRight: 20,
  },
  permission__desc: {
    flex: 1,
    paddingRight: 20,
  },
  permission__actions: {},
});

export default classes;
