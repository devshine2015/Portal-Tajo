import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const mainBrandColor = theme.palette.primary1Color;

const classes = StyleSheet.create({
  page: {
    height: '100%',
    // background: `linear-gradient(60deg, ${lightGray}, ${gray})`,
    backgroundColor: '#fff',
  },
  fakeBar: {
    backgroundColor: mainBrandColor,
    height: 64,
  },
  page__inn: {
    display: 'flex',
    justifyContent: 'center',
  },
  page__content: {
    flexDirection: 'column',
  },
});

export default classes;
