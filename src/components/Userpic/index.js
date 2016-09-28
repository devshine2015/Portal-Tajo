import React from 'react';
import pure from 'recompose/pure';
import Avatar from 'material-ui/Avatar';

function takeFirstLetter(string) {
  return string[0].toUpperCase();
}

function renderLetter(fallback, style) {
  const originalStrings = fallback.split(' ');
  let letters;

  if (originalStrings.length === 0) {
    letters = ['?'];
  } else if (originalStrings.length === 1) {
    letters = [takeFirstLetter(originalStrings[0])];
  } else if (originalStrings.length > 1) {
    originalStrings.length = 2;
    letters = originalStrings.map(string => takeFirstLetter(string));
  }

  return <Avatar style={style}>{letters.join()}</Avatar>;
}

function renderImage(src, style) {
  return <Avatar src={src} style={style} />;
}

const STYLE = {
  marginRight: 16,
};

const Userpic = ({
  children,
  src,
  style,
}) => {
  let child = null;
  const st = Object.assign({}, STYLE, style);

  if (src !== undefined) {
    child = renderImage(src, st);
  } else {
    child = renderLetter(children, st);
  }

  return child;
};

Userpic.propTypes = {
  children: React.PropTypes.string,
  src: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default pure(Userpic);
