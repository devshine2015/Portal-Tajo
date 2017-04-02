import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import pageShape from 'containers/InnerPortal/PropTypes';
import styles from './styles.css';
import { contextActions } from 'services/Global/actions';

const MenuItem = (props) =>
  <Link
    className={styles.menu__item}
    key={props.page.path}
    to={props.page.path}
    onClick={() => {props.closeSidebar(); props.setPgIdx(props.idx); console.log(" MENU ITEM>>> "+props.idx)}}
  >
   { props.niceName }
  </Link>;

MenuItem.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  page: pageShape.isRequired,
  niceName: React.PropTypes.string.isRequired,
  idx: React.PropTypes.number.isRequired,
  setPgIdx: React.PropTypes.func.isRequired,
};

const mapState = () => ({
});
const mapDispatch = {
  setPgIdx: contextActions.ctxSetPageIdx,
};

export default connect(mapState, mapDispatch)(MenuItem);
