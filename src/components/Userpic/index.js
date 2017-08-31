import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Avatar from 'material-ui/Avatar';

const fallbackDefault = R.defaultTo('?');
const splitUsername = R.pipe(fallbackDefault, R.trim, R.toUpper, R.split(' '));
const firstTwoLettersToString = R.pipe(R.join(''), R.take(2));

function renderLetter(fallback, style, rest) {
  const letters = R.map(R.take(1), splitUsername(fallback));
  const result = firstTwoLettersToString(letters);

  return <Avatar style={style} {...rest}>{ result }</Avatar>;
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

Userpic.defaultProps = {
  src: undefined,
};

Userpic.propTypes = {
  children: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.object,

  // props for Avatar component
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

export default pure(Userpic);
