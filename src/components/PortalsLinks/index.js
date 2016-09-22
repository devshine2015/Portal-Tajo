import React from 'react';
import pure from 'recompose/pure';
import { Link } from 'react-router';
import portals from 'configs/portals';
import createBaseUrl from 'utils/createBaseUrl';

import styles from './styles.css';

const URLSList = ({ currentFleet }) => (
  <div>
    Some text for test rebase
    Internal feature. Go to another fleet:
    <ul className={styles.list}>
      {
        portals.map(p => {
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
  </div>
);

URLSList.propTypes = {
  currentFleet: React.PropTypes.string,
};

export default pure(URLSList);
