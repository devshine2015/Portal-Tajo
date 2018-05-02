import React from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles.css';


const BrandLogos = () => {
  return (
    <div className={styles.logo}>
      <svg viewBox="0 0 36 37" width="128" height="125">
        <g fill="none" fillRule="evenodd">
          <ellipse fill="#FFF" cx="17.919" cy="18.021" rx="17.919" ry="18.021"/>
          <ellipse fill="#4A4A4A" cx="18.098" cy="18.047" rx="14.082" ry="14.042"/>
          <path fill="#FFF" d="M16.064 29.034h4.016v4.005h-4.016zM16.064 12.014h4.016v12.014h-4.016zM16.064 1.001h4.016v6.007h-4.016z"/>
        </g>
      </svg>
    </div>
  );
};

export default BrandLogos;
