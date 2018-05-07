import React from 'react';
import styles from './../styles.css';

const TripItem = (props) => {
  return (
    <div className={styles.tripItem} trip={props.name} onClick={props.handleClick}>
      <div className={styles.tripImageWrapper}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <linearGradient id="a" x1="50%" x2="50%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#FF2A68" />
              <stop offset="100%" stopColor="#FF5E3A" />
            </linearGradient>
          </defs>
          <g fill="url(#a)" fillRule="evenodd" transform="translate(-440 -179)">
            <path d="M465.75 179.25c14.083 0 25.5 11.417 25.5 25.5s-11.417 25.5-25.5 25.5-25.5-11.417-25.5-25.5 11.417-25.5 25.5-25.5zm0 3c-12.426 0-22.5 10.074-22.5 22.5s10.074 22.5 22.5 22.5 22.5-10.074 22.5-22.5-10.074-22.5-22.5-22.5z" />
            <path d="M477.75 214.952a15.839 15.839 0 0 1-3 2.725V204h-6a1.5 1.5 0 0 1-1.5-1.5v-6h-10.5v21.177a15.839 15.839 0 0 1-3-2.725v-19.908c0-.249.061-.484.17-.691.172-.197.35-.39.533-.577.23-.145.504-.23.797-.23h11.25v-.046h3.75v.177l.167-.167 6.959 6.959-.532.531h.906v13.952zM473.834 201l-3.584-3.584V201h3.584zm-.178-7.5c.71-.01 1.302-.013 1.793 0h-1.793zm-12.781 18.75h9.75a1.125 1.125 0 0 1 0 2.25h-9.75a1.125 1.125 0 1 1 0-2.25zm0-5.25h9.75a1.125 1.125 0 0 1 0 2.25h-9.75a1.125 1.125 0 1 1 0-2.25zm0-5.25h2.25a1.125 1.125 0 0 1 0 2.25h-2.25a1.125 1.125 0 1 1 0-2.25z" />
          </g>
        </svg>
      </div>
      <div className={styles.tripDescription}>
        <div className={styles.tripName}>
          Trip {props.tripNumber}
        </div>
        <div className={styles.description}>
          <span>{props.tripTime}</span>
          <span className={styles.bull}>&bull;</span>
          <span>{props.tripDriver}</span>
        </div>
      </div>
    </div>
  );
};
export default TripItem;
