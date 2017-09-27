import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const classes = StyleSheet.create({
  innerPortal: {
    paddingTop: theme.appBar.height,
    height: '100%',
  },
});

export default classes;
