import React from 'react';
import tinycolor from 'tinycolor2';
import { theme } from 'configs';


const ComingSoon = () => {
  const style = { width: '100%', 
    height: '100%',
    minHeight: '350px',
    lineHeight: '350px',
    textAlign: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
    color: tinycolor(theme.layout.headerColor).setAlpha(0.6).toString(),
  };

  // const lightStyle = status > 0 ? { backgroundColor: theme.palette.alertColor } : {};
  return (
    <div style={style}>
      COMING SOON...
    </div>
  );
};

export default ComingSoon;
