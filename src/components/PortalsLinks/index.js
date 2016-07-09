import React from 'react';
import pure from 'recompose/pure';
import { Link } from 'react-router';
import createBaseUrl from 'utils/createBaseUrl';
import { PORTALS } from 'containers/InnerPortal/constants';

import styles from './styles.css';

const URLSList = ({ currentFleet }) => (
  <ul className={styles.list}>
    {
      PORTALS.map(p => {
        if (currentFleet === p.fleet) {
          return null;
        }

        const link = `${createBaseUrl(p.fleet)}/`;
        return (
          <li
            key={p.fleet}
            className={styles.list__item}
          >
            <Link to={link}>{p.niceName}</Link>
          </li>
        );
      })
    }
  </ul>
);

URLSList.propTypes = {
  currentFleet: React.PropTypes.string,
};

export default pure(URLSList);
