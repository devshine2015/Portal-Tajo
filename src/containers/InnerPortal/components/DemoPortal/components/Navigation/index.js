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
        <svg viewBox="0 0 36 37" height="36" width="37">
          <g fill="none" fillRule="evenodd" opacity=".9">
            <ellipse fill="#FFF" cx="17.919" cy="18.021" rx="17.919" ry="18.021" />
            <ellipse fill="#4A4A4A" cx="18.098" cy="18.047" rx="14.082" ry="14.042" />
            <path fill="#FFF" d="M16.064 29.034h4.016v4.005h-4.016zM16.064 12.014h4.016v12.014h-4.016zM16.064 1.001h4.016v6.007h-4.016z" />
          </g>
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
