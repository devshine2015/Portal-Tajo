import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const classes = StyleSheet.create({
  languageWidget: {
    maxWidth: 300,
  },

  lang: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  lang__text: {},

  lang__options: {},

  option: {
    textTransform: 'uppercase',
    fontWeight: 200,
    fontSize: 14,
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'color .25s',

    ':hover': {
      color: theme.palette.primary1Color,
    },
  },

  option_selected: {
    color: theme.palette.primary1Color,
    fontWeight: 'normal',
  },
});

export default classes;
