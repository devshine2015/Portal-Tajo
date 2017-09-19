import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const classes = StyleSheet.create({
  submenu: {},

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  list__item: {
    ':not(:last-child)': {
      marginBottom: 5,
    },
  },

  list__item_active: {
    color: theme.palette.primary1Color,
  },

  subsection: {},

  subsection__text: {
    cursor: 'pointer',

    ':hover': {
      textDecoration: 'underline',
    },
  },
});

export default classes;
