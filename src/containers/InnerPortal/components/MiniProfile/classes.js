import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const classes = StyleSheet.create({
  profile: {
    backgroundColor: theme.palette.primary1Color,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  profile__inn: {
    color: '#fff',
    padding: '0 40px 0 35px',
  },

  text_welcome: {
    textTransform: 'capitalize',
    fontSize: 13,
  },

  text_name: {
    fontSize: 15,
  },

  userpic: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #fff',
  },
});

export default classes;
