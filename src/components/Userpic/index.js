import React from 'react';
import R from 'ramda';
import pure from 'recompose/pure';
import Avatar from 'material-ui/Avatar';

const splitUsername = R.pipe(R.trim, R.split(' '));
const takeFirstLetter = R.pipe(R.take(1), R.toUpper);

function renderLetter(fallback, style, rest) {
  const originalStrings = splitUsername(fallback);
  let letters;

  if (originalStrings.length === 0) {
    letters = ['?'];
  } else if (originalStrings.length === 1) {
    letters = [takeFirstLetter(originalStrings[0])];
  } else if (originalStrings.length > 1) {
    originalStrings.length = 2;
    letters = originalStrings.map(string => takeFirstLetter(string));
  }

  return <Avatar style={style} {...rest}>{letters.join()}</Avatar>;
}

function renderImage(src, style, rest) {
  return <Avatar src={src} style={style} {...rest} />;
}

const STYLE = {
  marginRight: 16,
  fontWeight: 300,
};

const Userpic = ({
  children,
  src,
  style,
  ...rest,
}) => {
  let child = null;
  const st = Object.assign({}, STYLE, style);

  if (src !== undefined) {
    child = renderImage(src, st, rest);
  } else {
    child = renderLetter(children, st, rest);
  }

  return child;
};

Userpic.propTypes = {
  children: React.PropTypes.string,
  src: React.PropTypes.string,
  style: React.PropTypes.object,

  // props for Avatar component
  backgroundColor: React.PropTypes.string,
  color: React.PropTypes.string,
};

export default pure(Userpic);
