import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    transition: 'all .3s',
    position: 'relative',
  },

  container_closed: {},

  container_open: {
    width: 250,
    height: 48,
    padding: '0 10px',
  },

  input: {
    transition: 'all .3s',
  },

  icon: {
    transition: 'opacity .25s',
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 24,
    height: 24,
    cursor: 'pointer',
    zIndex: 10,
  },

  icon_show: {
    opacity: 1,
    zIndex: 2,
  },

  icon_hide: {
    opacity: 0,
    zIndex: -1,
  },

  animatedS: {
    animationName: saturationFrames,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
});

const saturationFrames = {
  '0%': {
    filter: 'saturate(1)',
  },
  '5%': {
    filter: 'saturate(5)',
  },
  '50%': {
    filter: 'saturate(20)',
  },
  '85%': {
    filter: 'saturate(5)',
  },
  '100%': {
    filter: 'saturate(1)',
  },
};

export default classes;
