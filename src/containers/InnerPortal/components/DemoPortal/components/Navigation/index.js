import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDashboardPages } from 'containers/InnerPortal/reducer';
import { routeLocationPath } from 'projects/utils/routerReducer';
import styles from './styles.css';
import navIcons from './icons';

const Navigation = (props) => {

  return (
    <div className={styles.nav}>
      <div className={styles.nav__logo}>
        <svg viewBox="0 0 128 125"><g fill="none" fillRule="evenodd">
          <ellipse fill="#FFF" cx="63.713" cy="62.342" rx="63.713" ry="62.342"/>
          <ellipse fill="#4A4A4A" cx="64.349" cy="62.432" rx="50.07" ry="48.578"/>
          <path fill="#FFF" d="M57.116 100.44h14.279v13.854H57.116zM57.116 41.561h14.279v41.561H57.116zM57.116 3.463h14.279v20.781H57.116z"/></g>
        </svg>
      </div>
      <div className={styles.nav__links}>
        {
          props.links.map((link) => {
            return (
              <Link
                className={classnames(
                  styles.nav__link, {
                    'nav__link--active': link.path === props.activeRouteLocationPath
                  },
                )}
                key={link.path}
                to={link.path}
              >
                {
                  link.path === props.activeRouteLocationPath ?
                    navIcons[link.name].active : navIcons[link.name].custom
                }
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

Navigation.propTypes = {
  links: PropTypes.array,
};

Navigation.defaultProps = {
  links: [],
};

const mapStateToProps = state => ({
  links: getDashboardPages(state).toArray(),
  activeRouteLocationPath: routeLocationPath(state),
});

export default connect(mapStateToProps, null)(Navigation);
